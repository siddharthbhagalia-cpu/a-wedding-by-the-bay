// Painted (pichwai-inspired) lotus, orchid and peacock ornaments for the invitation arch.

// ─────────── Lotus ───────────
const PETAL = "M0 0C-8.5 -8 -9.5 -27 0 -42C9.5 -27 8.5 -8 0 0Z";

function Petal({ r, sx = 1, sy = 1, id, row }) {
    return (
        <g transform={`rotate(${r}) scale(${sx} ${sy})`}>
            <path d={PETAL} fill={`url(#pt-${row}-${id})`} stroke="#c2487c" strokeWidth=".55" strokeOpacity=".7" />
            <path d="M0 -3C-1 -14 -1 -26 0 -37M0 -10C-3 -16 -4 -24 -3 -30M0 -10C3 -16 4 -24 3 -30" stroke="#d9668f" strokeWidth=".45" fill="none" opacity=".55" />
        </g>
    );
}

function Lotus({ x, y, s = 1, tilt = 0, id }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
            {[-78, -54, 54, 78].map((r) => (
                <Petal key={`o${r}`} r={r} sx={0.95} sy={0.92} id={id} row="o" />
            ))}
            {[-36, -16, 16, 36].map((r) => (
                <Petal key={`m${r}`} r={r} sx={1} sy={1.08} id={id} row="m" />
            ))}
            <Petal r={0} sx={0.95} sy={1.12} id={id} row="m" />
            {[-26, 26].map((r) => (
                <Petal key={`i${r}`} r={r} sx={0.78} sy={0.72} id={id} row="i" />
            ))}
            <Petal r={0} sx={0.8} sy={0.66} id={id} row="i" />
            <ellipse cx="0" cy="-6" rx="7" ry="3" fill="#e9b949" />
            <g stroke="#c8902e" strokeWidth=".6">
                <path d="M-5 -6l-1 -3M-2 -7l-.5 -3M1 -7l.5 -3M4 -6l1 -3" />
            </g>
        </g>
    );
}

function Bud({ x, y, s = 1, tilt = 0, id, stem = 34 }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
            <path d={`M0 ${stem}C-1 ${stem * 0.6} 1 ${stem * 0.3} 0 0`} stroke="#7d8a4c" strokeWidth="2" fill="none" />
            <path d="M0 2C-10 -6 -9 -26 0 -36C9 -26 10 -6 0 2Z" fill={`url(#pt-m-${id})`} stroke="#c2487c" strokeWidth=".55" />
            <path d="M0 2C-6 -6 -6 -20 0 -32" stroke="#d9668f" strokeWidth=".6" fill="none" opacity=".7" />
            <path d="M-6 0C-4 4 4 4 6 0" stroke="#7d8a4c" strokeWidth="1.6" fill="none" />
        </g>
    );
}

function SeedPod({ x, y, s = 1, tilt = 0 }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
            <path d="M0 40C-1 26 1 14 0 4" stroke="#7d8a4c" strokeWidth="1.8" fill="none" />
            <path d="M-12 -6C-10 -14 10 -14 12 -6L6 6C3 8 -3 8 -6 6Z" fill="#a8935a" stroke="#7a6838" strokeWidth=".7" />
            <ellipse cx="0" cy="-8" rx="12" ry="3.4" fill="#bca56a" stroke="#7a6838" strokeWidth=".6" />
            {[-7, -2.5, 2.5, 7].map((cx) => (
                <circle key={cx} cx={cx} cy="-8" r="1.1" fill="#7a6838" />
            ))}
        </g>
    );
}

// Olive-gold lotus leaf with radiating veins and a softly scalloped rim.
function Leaf({ x, y, r = 22, squash = 0.42, rot = 0, id }) {
    const rim = Array.from({ length: 28 }, (_, i) => {
        const a = (i / 28) * Math.PI * 2;
        const rr = r * (1 + 0.05 * Math.sin(i * 2.7));
        return `${(rr * Math.cos(a)).toFixed(1)},${(rr * Math.sin(a) * squash).toFixed(1)}`;
    }).join(" ");
    return (
        <g transform={`translate(${x} ${y}) rotate(${rot})`}>
            <polygon points={rim} fill={`url(#lf-${id})`} stroke="#6b6634" strokeWidth=".7" strokeLinejoin="round" />
            {Array.from({ length: 12 }, (_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return <path key={i} d={`M0 0L${(r * 0.9 * Math.cos(a)).toFixed(1)} ${(r * 0.9 * Math.sin(a) * squash).toFixed(1)}`} stroke="#d8c98c" strokeWidth=".55" opacity=".8" />;
            })}
            <circle r="1.6" fill="#d8c98c" />
        </g>
    );
}

function Blossom({ x, y, s = 1 }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
            {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} cx="0" cy="-4" rx="2.6" ry="4" transform={`rotate(${r})`} fill="#f4bfd2" stroke="#c2487c" strokeWidth=".4" />
            ))}
            <circle r="1.6" fill="#c2487c" />
        </g>
    );
}

function LotusDefs({ id }) {
    const pink = (row, base, mid, tip) => (
        <linearGradient id={`pt-${row}-${id}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={base} />
            <stop offset=".5" stopColor={mid} />
            <stop offset="1" stopColor={tip} />
        </linearGradient>
    );
    return (
        <defs>
            {pink("o", "#fbe9ef", "#f2b8cc", "#cf4d84")}
            {pink("m", "#fffaf8", "#f8d6e2", "#d9578c")}
            {pink("i", "#ffffff", "#fbe4ec", "#e47aa2")}
            <radialGradient id={`lf-${id}`} cx="45%" cy="40%" r="70%">
                <stop offset="0" stopColor="#c2b47a" />
                <stop offset=".6" stopColor="#9c9258" />
                <stop offset="1" stopColor="#77733f" />
            </radialGradient>
        </defs>
    );
}

// A side-view lotus: cupped and layered, petal tips curling outward.
function SideLotus({ x, y, s = 1, tilt = 0, id, open = 1 }) {
    // [angle, length, width, row]  row: 0 back, 1 middle, 2 front
    const petals = [
        [-70 * open, 30, 9, 0], [-48 * open, 36, 10, 0], [48 * open, 36, 10, 0], [70 * open, 30, 9, 0],
        [-26 * open, 40, 11, 0], [26 * open, 40, 11, 0], [0, 42, 11, 0],
        [-56 * open, 32, 10, 1], [56 * open, 32, 10, 1], [-34 * open, 36, 11, 1], [34 * open, 36, 11, 1], [-12, 38, 11, 1], [12, 38, 11, 1],
        [-40 * open, 28, 11, 2], [40 * open, 28, 11, 2], [-16, 30, 12, 2], [16, 30, 12, 2], [0, 31, 12, 2],
    ];
    const rows = ["o", "m", "i"];
    return (
        <g transform={`translate(${x} ${y}) rotate(${tilt}) scale(${s})`}>
            {petals.map(([r, l, w, row], i) => {
                const tip = r * 0.12; // tips curl outward
                const d = `M0 0C${-w} ${-l * 0.3} ${-w * 0.9 + tip} ${-l * 0.78} ${tip} ${-l}C${w * 0.9 + tip} ${-l * 0.78} ${w} ${-l * 0.3} 0 0Z`;
                return (
                    <g key={i} transform={`rotate(${r * (row === 2 ? 0.9 : 1)}) translate(0 ${row * 2})`}>
                        <path d={d} fill={`url(#pt-${rows[row]}-${id})`} stroke="#b83a72" strokeWidth=".5" strokeOpacity=".55" />
                        <path d={`M0 -2C${-w * 0.25} ${-l * 0.4} ${tip * 0.6} ${-l * 0.75} ${tip} ${-l + 3}`} stroke="#d9668f" strokeWidth=".45" fill="none" opacity=".55" />
                        <path d={`M0 -2C${-w * 0.55} ${-l * 0.35} ${-w * 0.4 + tip} ${-l * 0.7} ${tip * 0.8} ${-l + 6}`} stroke="#d9668f" strokeWidth=".35" fill="none" opacity=".4" />
                    </g>
                );
            })}
            {/* stamens peeking between the inner petals */}
            <g stroke="#d9a63a" strokeWidth=".7" strokeLinecap="round">
                {[-9, -6, -3, 0, 3, 6, 9].map((dx) => (
                    <path key={dx} d={`M${dx * 0.6} 2L${dx} ${-12 - Math.abs(dx) * -0.3}`} />
                ))}
            </g>
            <g fill="#f2c94c">
                {[-9, -6, -3, 0, 3, 6, 9].map((dx) => (
                    <circle key={dx} cx={dx} cy={-12 + Math.abs(dx) * 0.3} r="1.1" />
                ))}
            </g>
            {/* sepals at the base */}
            <path d="M-8 2C-4 6 4 6 8 2C4 4 -4 4 -8 2Z" fill="#7d8a4c" />
        </g>
    );
}

function Stem({ d }) {
    return <path d={d} stroke="#6f7f43" strokeWidth="2.2" fill="none" strokeLinecap="round" />;
}

// A lush lotus bunch for each bottom corner of the arch.
export function LotusCluster({ side }) {
    const id = `lc-${side}`;
    return (
        <div className={`blooms blooms-${side}`} aria-hidden="true">
            <svg viewBox="0 0 200 170">
                <LotusDefs id={id} />
                {/* golden vine curls and tiny blossoms behind */}
                <g stroke="#b89548" strokeWidth=".9" fill="none" opacity=".85">
                    <path d="M10 150C2 120 10 92 30 80C42 72 44 60 38 50" />
                    <path d="M30 80C22 78 20 70 25 66C29 64 32 68 28 70" />
                    <path d="M160 160C170 136 186 126 198 126" />
                    <path d="M120 70C126 58 138 52 150 54" />
                </g>
                <Blossom x={38} y={48} s={1.15} />
                <Blossom x={150} y={54} s={0.95} />
                <Blossom x={20} y={96} s={0.9} />
                <Blossom x={196} y={124} s={0.85} />

                {/* back leaves */}
                <Leaf x={150} y={150} r={34} squash={0.4} rot={-10} id={id} />
                <Leaf x={40} y={160} r={26} squash={0.38} rot={6} id={id} />

                {/* stems */}
                <Stem d="M70 168C70 150 68 136 64 122" />
                <Stem d="M104 168C106 140 110 120 116 104" />
                <Stem d="M136 168C136 152 138 140 142 128" />
                <Stem d="M40 168C38 150 34 138 30 128" />

                {/* buds and pod at the back */}
                <Bud x={88} y={58} s={0.78} tilt={-8} id={id} stem={62} />
                <Bud x={164} y={92} s={0.62} tilt={18} id={id} stem={56} />
                <SeedPod x={176} y={110} s={0.75} tilt={14} />

                {/* lotuses, back to front */}
                <SideLotus x={116} y={104} s={0.82} tilt={10} id={id} />
                <SideLotus x={30} y={128} s={0.62} tilt={-16} id={id} open={0.9} />
                <SideLotus x={142} y={130} s={0.6} tilt={18} id={id} open={0.85} />
                <SideLotus x={64} y={124} s={1.05} tilt={-4} id={id} />

                {/* front leaves */}
                <Leaf x={92} y={164} r={30} squash={0.34} rot={2} id={id} />
                <Leaf x={8} y={162} r={18} squash={0.36} rot={-8} id={id} />
                <path d="M182 168C186 150 196 138 200 136C196 150 190 160 182 168Z" fill="#8f8a4c" opacity=".9" />
            </svg>
        </div>
    );
}

// ─────────── Orchids ───────────
function Orchid({ x, y, s = 1, r = 0, id }) {
    return (
        <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
            <path d="M0 0C-4 -6 -4 -16 0 -22C4 -16 4 -6 0 0Z" fill={`url(#or-p-${id})`} stroke="#d9a3c4" strokeWidth=".5" />
            <path d="M0 0C-6 3 -14 10 -16 17C-9 15 -3 8 0 0Z" fill={`url(#or-p-${id})`} stroke="#d9a3c4" strokeWidth=".5" />
            <path d="M0 0C6 3 14 10 16 17C9 15 3 8 0 0Z" fill={`url(#or-p-${id})`} stroke="#d9a3c4" strokeWidth=".5" />
            <path d="M0 0C-8 -10 -22 -10 -24 -2C-22 6 -8 6 0 0Z" fill={`url(#or-w-${id})`} stroke="#d9a3c4" strokeWidth=".5" />
            <path d="M0 0C8 -10 22 -10 24 -2C22 6 8 6 0 0Z" fill={`url(#or-w-${id})`} stroke="#d9a3c4" strokeWidth=".5" />
            <g stroke="#c45a9a" strokeWidth=".45" opacity=".55" fill="none">
                <path d="M-3 -1C-9 -4 -15 -4 -19 -2M3 -1C9 -4 15 -4 19 -2" />
            </g>
            <path d="M0 1C-4 3 -5 8 -3 11C-1 13 1 13 3 11C5 8 4 3 0 1Z" fill="#a8236f" />
            <path d="M-2 2C-5 1 -7 3 -6 5M2 2C5 1 7 3 6 5" stroke="#a8236f" strokeWidth="1.2" fill="none" />
            <circle cx="0" cy="-1" r="1.6" fill="#f5d36b" />
        </g>
    );
}

export function OrchidSpray({ side }) {
    const id = `os-${side}`;
    const flowers = [
        [40, 22, 0.95, -10],
        [70, 40, 1.05, 8],
        [92, 66, 0.95, 22],
        [104, 96, 0.8, 34],
        [108, 122, 0.62, 44],
    ];
    return (
        <div className={`orchids orchids-${side}`} aria-hidden="true">
            <svg viewBox="0 0 150 170" className="orchids-svg">
                <defs>
                    <radialGradient id={`or-w-${id}`} cx="30%" cy="50%" r="80%">
                        <stop offset="0" stopColor="#fff" />
                        <stop offset=".6" stopColor="#fbe7f1" />
                        <stop offset="1" stopColor="#efb6d3" />
                    </radialGradient>
                    <linearGradient id={`or-p-${id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#fdf1f7" />
                        <stop offset="1" stopColor="#f1bfd8" />
                    </linearGradient>
                </defs>
                <path d="M0 4C26 -2 50 6 62 16C40 22 16 18 0 4Z" fill="#5e8a4e" />
                <path d="M0 14C18 18 30 30 34 44C18 40 6 30 0 14Z" fill="#7aa366" opacity=".9" />
                <path d="M6 8C46 10 84 34 100 70C110 94 112 120 110 140" stroke="#6b7f4a" strokeWidth="1.8" fill="none" />
                {flowers.map(([x, y, s, r], i) => (
                    <Orchid key={i} x={x} y={y} s={s} r={r} id={id} />
                ))}
                <ellipse cx="110" cy="146" rx="3.4" ry="5" fill="#f3c9de" stroke="#d9a3c4" strokeWidth=".5" />
                <ellipse cx="109" cy="157" rx="2.4" ry="3.6" fill="#e7b3cd" />
            </svg>
        </div>
    );
}

// ─────────── Peacock ───────────
// An upright, painterly peacock: long S-curved neck, fan crest, barred wing and a
// slim train of overlapping eyed feathers that falls straight down the pillar.
// viewBox 0 0 100 300; feet at (52, 128).

const r1 = (n) => Math.round(n * 10) / 10;

// Train feathers, generated once. Rows run top → bottom; drawn bottom-up so the
// feathers nearer the body overlap the ones below, as on a real train.
const TRAIN = (() => {
    const rows = [];
    let y = 108;
    let row = 0;
    while (y < 292) {
        const t = (y - 108) / 184;
        const width = 26 + t * 34; // train flares as it falls
        const size = 5.4 + t * 4.4; // feathers grow larger toward the tip
        const cx = 62 + t * 4;
        const n = Math.max(3, Math.round(width / (size * 0.95)));
        const span = width - size;
        const items = [];
        for (let i = 0; i < n; i++) {
            const off = (row % 2 ? 0.5 : 0) / n;
            const u = n === 1 ? 0.5 : i / (n - 1);
            const x = cx - span / 2 + span * Math.min(1, u + off * (i < n - 1 ? 1 : 0));
            items.push([r1(x), r1(y + (i % 2) * 1.2), r1(size)]);
        }
        rows.push(items);
        y += size * 0.7;
        row++;
    }
    return rows.reverse().flat();
})();

function TrainFeather({ x, y, s }) {
    const d =
        `M${x} ${r1(y - 0.95 * s)}` +
        `C${r1(x + 0.72 * s)} ${r1(y - 0.4 * s)} ${r1(x + 0.64 * s)} ${r1(y + 0.78 * s)} ${x} ${r1(y + 0.84 * s)}` +
        `C${r1(x - 0.64 * s)} ${r1(y + 0.78 * s)} ${r1(x - 0.72 * s)} ${r1(y - 0.4 * s)} ${x} ${r1(y - 0.95 * s)}Z`;
    const ey = r1(y + 0.22 * s);
    return (
        <g>
            <path d={d} fill="url(#pk-sage)" stroke="#e9e4c4" strokeWidth=".35" strokeOpacity=".55" />
            <path d={`M${x} ${r1(y - 0.9 * s)}V${ey}`} stroke="#e9e4c4" strokeWidth=".3" opacity=".45" />
            <ellipse cx={x} cy={ey} rx={r1(0.44 * s)} ry={r1(0.53 * s)} fill="#8a6a34" />
            <ellipse cx={x} cy={ey} rx={r1(0.36 * s)} ry={r1(0.44 * s)} fill="#e0b85c" />
            <ellipse cx={x} cy={r1(ey + 0.03 * s)} rx={r1(0.27 * s)} ry={r1(0.33 * s)} fill="#1c9aa3" />
            <ellipse cx={x} cy={r1(ey + 0.06 * s)} rx={r1(0.16 * s)} ry={r1(0.21 * s)} fill="#16307a" />
        </g>
    );
}

// Small barred wing feathers (cream with brown bars), in staggered rows.
const WING = (() => {
    const out = [];
    for (let r = 0; r < 10; r++) {
        const y = 75 + r * 3.8;
        const n = r < 2 ? 3 : r < 7 ? 5 : 4;
        for (let i = 0; i < n; i++) out.push([r1(57 + i * 3.4 + (r % 2) * 1.7 + (r > 6 ? 2 : 0)), r1(y)]);
    }
    return out;
})();

export function Peacock() {
    return (
        <div className="peacock" aria-hidden="true">
            <svg viewBox="0 0 100 300" className="peacock-svg">
                <defs>
                    <linearGradient id="pk-sage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#6f8a62" />
                        <stop offset=".6" stopColor="#97a77a" />
                        <stop offset="1" stopColor="#b9b98c" />
                    </linearGradient>
                    <linearGradient id="pk-neck" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#1b3f9a" />
                        <stop offset=".45" stopColor="#2f63c8" />
                        <stop offset=".7" stopColor="#3a7fd8" />
                        <stop offset="1" stopColor="#173a8a" />
                    </linearGradient>
                    <linearGradient id="pk-breast" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2e68cc" />
                        <stop offset="1" stopColor="#163b86" />
                    </linearGradient>
                    <linearGradient id="pk-wing" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#efe2c4" />
                        <stop offset="1" stopColor="#bfa477" />
                    </linearGradient>
                </defs>

                {/* train (sways from where it leaves the body) */}
                <g className="pk-train">
                    {TRAIN.map(([x, y, s], i) => (
                        <TrainFeather key={i} x={x} y={y} s={s} />
                    ))}
                </g>

                {/* legs */}
                <path d="M50 114L48 128M57 114L56 128" stroke="#8f8172" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M44 128.5h7M52 128.5h7" stroke="#8f8172" strokeWidth="1.3" strokeLinecap="round" />

                {/* body: blue breast with a folded, barred wing */}
                <path d="M41 86C39 72 46 63 56 63C68 63 75 74 75 90C75 104 68 116 56 118C46 119 42 104 41 86Z" fill="url(#pk-breast)" />
                <path d="M53 69C65 67 75 76 75 91C75 105 68 116 58 118C63 103 63 85 53 69Z" fill="url(#pk-wing)" />
                <g>
                    {WING.map(([x, y], i) => (
                        <g key={i}>
                            <path d={`M${x - 1.8} ${y}C${x - 1.8} ${y + 2.8} ${x + 1.8} ${y + 2.8} ${x + 1.8} ${y}`} fill="#f2e6cb" stroke="#9a7c4c" strokeWidth=".3" />
                            <path d={`M${x - 1.1} ${y + 1}h2.2M${x - 0.7} ${y + 1.8}h1.4`} stroke="#7a5a32" strokeWidth=".3" opacity=".8" />
                        </g>
                    ))}
                </g>
                <path d="M58 104C62 108 64 112 62 118" stroke="#3f5c3a" strokeWidth="1" fill="none" opacity=".6" />

                {/* neck + head (tilts and bobs from the base of the neck) */}
                <g className="pk-head">
                    <path
                        d="M44 78C38 68 36 58 40 48C43 41 44 34 41 28C39 24 37 19 39 15C41 11 46 10 48 14C50 18 48 24 48 30C48 38 47 44 49 52C51 60 55 66 58 70Z"
                        fill="url(#pk-neck)"
                    />
                    <path d="M42 66C39 58 40 50 43 44" stroke="#6aa6ec" strokeWidth=".8" fill="none" opacity=".6" />
                    <path d="M46 70C44 62 45 54 46 48" stroke="#0f2e74" strokeWidth=".6" fill="none" opacity=".5" />
                    {/* beak */}
                    <path d="M39.2 15.6L32.4 17.6L39.4 18.2Z" fill="#c9bfae" stroke="#8f8172" strokeWidth=".3" />
                    {/* white face markings around the eye */}
                    <path d="M40.2 13.8C42.2 12.6 45.2 12.8 46.6 14.2C44.6 14.6 42.4 14.8 40.2 13.8Z" fill="#fff" />
                    <path d="M40.4 17C42.4 18 45 17.8 46.4 16.6C44.4 16.4 42.4 16.4 40.4 17Z" fill="#fff" />
                    <ellipse className="pk-eye" cx="42.4" cy="15.4" rx=".9" ry=".85" fill="#111" />
                    {/* fan crest */}
                    <g className="pk-crest">
                        {[-34, -24, -14, -4, 6, 16, 26].map((a, i) => {
                            const rad = ((a - 90) * Math.PI) / 180;
                            const x2 = r1(44 + Math.cos(rad) * 9);
                            const y2 = r1(11.5 + Math.sin(rad) * 9);
                            return (
                                <g key={i}>
                                    <path d={`M44 11.5L${x2} ${y2}`} stroke="#4a5a7a" strokeWidth=".35" />
                                    <ellipse cx={x2} cy={y2} rx=".9" ry="1.3" transform={`rotate(${a} ${x2} ${y2})`} fill="#1f4fae" />
                                </g>
                            );
                        })}
                    </g>
                </g>
            </svg>
        </div>
    );
}
