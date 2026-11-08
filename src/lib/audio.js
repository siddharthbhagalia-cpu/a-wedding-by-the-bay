// 40 s soundtrack: the original site's pad (first 12 s) continued with new
// music built from the same sound, plus ocean waves; birds removed.
// Both loop gaplessly on Web Audio. Browsers block autoplay, so start() must be
// called from a tap. `len` is each loop's true length in seconds; MP3 encoding
// can add a few ms of silence at the start, which we skip at the loop seam.

const TRACKS = [
    { src: "audio/music-40s.mp3", gain: 0.5, len: 40.253379 },
    { src: "audio/waves.mp3", gain: 0.6, len: 36 },
];

let ctx = null;
let master = null;
let started = false;
let muted = false;
let hiddenPaused = false;
const listeners = new Set();
const emit = () => listeners.forEach((fn) => fn(isPlaying()));

export const isPlaying = () => started && !muted;
export const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
};

const fadeTo = (value, seconds = 1.2) => {
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(value, now + seconds);
};

// Index of the first audible sample (skips encoder padding, if any).
function leadIn(buf) {
    const d = buf.getChannelData(0);
    const max = Math.min(d.length, buf.sampleRate * 0.2);
    for (let i = 0; i < max; i++) if (Math.abs(d[i]) > 1e-4) return i / buf.sampleRate;
    return 0;
}

// Start downloading the tracks as soon as the page loads, so sound begins
// right after the tap even on slow connections.
const prefetched = new Map();
const prefetch = () =>
    TRACKS.forEach((t) => {
        if (!prefetched.has(t.src)) prefetched.set(t.src, fetch(t.src).then((r) => r.arrayBuffer()));
    });
if (typeof window !== "undefined") {
    if (document.readyState === "complete") setTimeout(prefetch, 300);
    else window.addEventListener("load", () => setTimeout(prefetch, 300), { once: true });
}

const decode = (data) =>
    new Promise((resolve, reject) => {
        const p = ctx.decodeAudioData(data, resolve, reject); // callback form for older Safari
        if (p && p.then) p.then(resolve, reject);
    });

async function loadAndLoop({ src, gain, len }) {
    prefetch();
    let data;
    try {
        data = await prefetched.get(src);
    } catch {
        data = await (await fetch(src)).arrayBuffer();
    }
    const buf = await decode(data);
    const node = ctx.createBufferSource();
    node.buffer = buf;
    node.loop = true;
    const start = leadIn(buf);
    if (len && start + len <= buf.duration + 0.001) {
        node.loopStart = start;
        node.loopEnd = start + len;
    }
    const g = ctx.createGain();
    g.gain.value = gain;
    node.connect(g).connect(master);
    node.start(0, start);
}

// iPhones mute Web Audio when the ring/silent switch is on, unless the page
// is treated as media playback. Both steps below must run inside the tap.
let unlockEl = null;
function unlockMediaPlayback() {
    try {
        if (navigator.audioSession) navigator.audioSession.type = "playback";
    } catch {
        /* older browsers */
    }
    try {
        unlockEl = new Audio("audio/silence.mp3");
        unlockEl.loop = true;
        unlockEl.setAttribute("playsinline", "");
        unlockEl.play().catch(() => {});
    } catch {
        /* ignore */
    }
}

export function start() {
    if (started) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    unlockMediaPlayback();
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    ctx.resume();
    started = true;
    TRACKS.forEach((t) => loadAndLoop(t).catch(() => {}));
    fadeTo(1, 3);
    emit();

    document.addEventListener("visibilitychange", () => {
        if (!ctx) return;
        if (document.hidden) {
            hiddenPaused = true;
            ctx.suspend();
            unlockEl?.pause();
        } else if (hiddenPaused) {
            hiddenPaused = false;
            if (!muted) {
                unlockEl?.play().catch(() => {});
                ctx.resume();
            }
        }
    });
}

export function toggle() {
    if (!started) {
        start();
        return;
    }
    muted = !muted;
    if (muted) {
        fadeTo(0, 0.6);
        setTimeout(() => muted && ctx.suspend(), 650);
    } else {
        unlockEl?.play().catch(() => {});
        ctx.resume();
        fadeTo(1, 1.2);
    }
    emit();
}
