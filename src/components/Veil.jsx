import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { start as startAudio, resume as resumeAudio } from "../lib/audio";

const ease = [0.22, 1, 0.36, 1];
const GROW_MS = 900; // how long the flame takes to catch after the tap

// A brass diya. --p (0 → 1) on the parent controls how much the flame has caught.
function Diya() {
    return (
        <svg className="diya" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
                <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f7d98c" />
                    <stop offset=".35" stopColor="#d9a84a" />
                    <stop offset=".7" stopColor="#a8752c" />
                    <stop offset="1" stopColor="#6e4a1c" />
                </linearGradient>
                <linearGradient id="brass-rim" x1="0" x2="1">
                    <stop offset="0" stopColor="#9a6a26" />
                    <stop offset=".5" stopColor="#ffe6a6" />
                    <stop offset="1" stopColor="#9a6a26" />
                </linearGradient>
                <radialGradient id="flame-g" cx="50%" cy="70%" r="65%">
                    <stop offset="0" stopColor="#fffbe8" />
                    <stop offset=".35" stopColor="#ffe07a" />
                    <stop offset=".7" stopColor="#ff9f2e" />
                    <stop offset="1" stopColor="#e2551b" />
                </radialGradient>
                <radialGradient id="ghee" cx="50%" cy="40%" r="60%">
                    <stop offset="0" stopColor="#ffe9a8" />
                    <stop offset="1" stopColor="#c9902f" />
                </radialGradient>
            </defs>

            {/* flame: grows with --p and flickers once lit */}
            <g className="diya-flame">
                <path
                    d="M62 70C50 62 50 46 60 30C62 40 72 44 70 56C69 64 66 68 62 70Z"
                    fill="url(#flame-g)"
                />
                <path d="M61.5 69C56 64 56 55 60.5 47C61.5 53 66 56 65 61C64.5 65 63.5 67.5 61.5 69Z" fill="#fffdf2" opacity=".9" />
            </g>
            {/* wick */}
            <path d="M62 72C61 68 62 66 63 64" stroke="#3a2412" strokeWidth="1.6" strokeLinecap="round" fill="none" />

            {/* bowl with a pinched spout to the right */}
            <path d="M18 72C18 90 36 100 56 100C78 100 96 92 104 76C96 74 84 72 74 72Z" fill="url(#brass)" />
            <ellipse cx="50" cy="72" rx="32" ry="7" fill="url(#ghee)" />
            <path d="M18 72C30 66 74 66 104 76" stroke="url(#brass-rim)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            {/* engraved bands */}
            <path d="M24 84C38 92 72 94 92 84" stroke="#f3d48a" strokeWidth=".8" fill="none" opacity=".7" />
            <g fill="#f3d48a" opacity=".75">
                {[32, 42, 52, 62, 72, 82].map((x, i) => (
                    <circle key={x} cx={x} cy={i === 0 || i === 5 ? 87 : 89} r="1.1" />
                ))}
            </g>
            {/* foot */}
            <path d="M44 100C44 104 48 106 56 106C64 106 68 104 68 100Z" fill="url(#brass)" />
            <ellipse cx="56" cy="107" rx="18" ry="3" fill="url(#brass-rim)" />
        </svg>
    );
}

export default function Veil({ onOpen }) {
    const [open, setOpen] = useState(true);
    const [lit, setLit] = useState(false);
    const rootRef = useRef(null);
    const raf = useRef(0);
    const busy = useRef(false);

    useEffect(() => {
        document.documentElement.classList.toggle("locked", open);
    }, [open]);
    useEffect(() => () => cancelAnimationFrame(raf.current), []);

    const paint = (p) => rootRef.current?.style.setProperty("--p", p.toFixed(3));

    // One tap: the flame catches and grows on its own, the glow blooms, then the site opens.
    const begin = () => {
        if (busy.current) return;
        busy.current = true;
        // inside the tap itself, so phones allow sound and the Setting video
        startAudio();
        resumeAudio();
        window.dispatchEvent(new Event("wbb:unlock"));
        const t0 = performance.now();
        const grow = (t) => {
            const k = Math.min(1, (t - t0) / GROW_MS);
            paint(1 - Math.pow(1 - k, 3));
            if (k < 1) raf.current = requestAnimationFrame(grow);
            else {
                setLit(true);
                navigator.vibrate?.(25);
                setTimeout(() => {
                    setOpen(false);
                    onOpen?.();
                }, 1400);
            }
        };
        raf.current = requestAnimationFrame(grow);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={rootRef}
                    className={`veil ${lit ? "is-lit" : ""}`}
                    style={{ "--p": 0 }}
                    onClick={begin}
                    onContextMenu={(e) => e.preventDefault()}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.4, ease } }}
                >
                    <motion.img
                        src="img/scene-900.webp"
                        srcSet="img/scene-900.webp 900w, img/scene-1600.webp 1448w"
                        sizes="100vw"
                        alt=""
                        className="veil-img"
                        draggable={false}
                        initial={{ scale: 1.08, opacity: 1 }}
                        animate={{ scale: 1.02 }}
                        exit={{ scale: 1.08, filter: "blur(6px) brightness(1.4)" }}
                        transition={{ duration: 3.2, ease }}
                    />
                    <div className="veil-shade" />
                    {/* warm light that spreads from the diya */}
                    <div className="veil-glow" aria-hidden="true" />

                    <motion.div
                        className="veil-copy"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, transition: { duration: 0.6 } }}
                        transition={{ delay: 0.8, duration: 1.2, ease }}
                    >
                        <img src="img/ganpati.webp" alt="" className="veil-ganesha" draggable={false} />

                        <button
                            type="button"
                            className="diya-btn"
                            aria-label="Tap to light the diya and begin A Wedding By The Bay"
                        >
                            <Diya />
                        </button>

                        <span className="caps veil-caps">{lit ? "Shubh Aarambh" : "Tap the diya to begin"}</span>
                        <span className="veil-script">A Wedding By The Bay</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
