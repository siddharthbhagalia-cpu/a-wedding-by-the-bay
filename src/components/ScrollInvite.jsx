import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { LotusCluster } from "./Flowers";
import { Sprig } from "./Hero";
import { couple, invite, celebrations } from "../content";

const families = celebrations.events.find((e) => e.families)?.families;

// ── Arch geometry. Width is always 100 units; height H follows the frame, so the
// cusped crown keeps its shape on every screen and only the pillars get taller.
function archPath(H, d = 0) {
    const L = 5 + d;
    const R = 95 - d;
    const B = H - 3 - d;
    const k = d * 0.7; // push the crown down as it insets
    const m = (x) => 100 - x;
    const pts = {
        side: 50 + k,
        l1: [L + 13, 37 + k],
        l2: [L + 25, 25 + k],
        rise: [45.5, 10 + k],
        peak: 3 + d * 1.3,
    };
    return [
        `M ${L} ${B - 5}`,
        `L ${L} ${pts.side}`,
        `C ${L} ${pts.side - 8} ${L + 5} ${pts.l1[1]} ${pts.l1[0]} ${pts.l1[1]}`,
        `C ${pts.l1[0]} ${pts.l1[1] - 7} ${pts.l1[0] + 6} ${pts.l2[1]} ${pts.l2[0]} ${pts.l2[1]}`,
        `C ${pts.l2[0] + 3} ${pts.l2[1] - 9} ${pts.rise[0] - 7} ${pts.rise[1] + 2} ${pts.rise[0]} ${pts.rise[1]}`,
        `Q 50 ${pts.rise[1] - 2} 50 ${pts.peak}`,
        `Q 50 ${pts.rise[1] - 2} ${m(pts.rise[0])} ${pts.rise[1]}`,
        `C ${m(pts.rise[0] - 7)} ${pts.rise[1] + 2} ${m(pts.l2[0] + 3)} ${pts.l2[1] - 9} ${m(pts.l2[0])} ${pts.l2[1]}`,
        `C ${m(pts.l2[0] + 6)} ${pts.l2[1]} ${m(pts.l1[0])} ${pts.l1[1] - 7} ${m(pts.l1[0])} ${pts.l1[1]}`,
        `C ${m(L + 5)} ${pts.l1[1]} ${R} ${pts.side - 8} ${R} ${pts.side}`,
        `L ${R} ${B - 5}`,
        `Q ${R} ${B} ${R - 5} ${B}`,
        `L ${L + 5} ${B}`,
        `Q ${L} ${B} ${L} ${B - 5}`,
        "Z",
    ].join(" ");
}

// A line that writes itself in over a slice of scroll.
function Line({ progress, at, children, className = "", as = "div" }) {
    const span = 0.07;
    const o = useTransform(progress, [at, at + span], [0, 1]);
    const y = useTransform(progress, [at, at + span], [14, 0]);
    const blur = useTransform(progress, [at, at + span], ["blur(4px)", "blur(0px)"]);
    const M = motion[as];
    return (
        <M className={className} style={{ opacity: o, y, filter: blur }}>
            {children}
        </M>
    );
}

function Ornament({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 120 12" aria-hidden="true">
            <g stroke="var(--gold)" strokeWidth=".8" fill="none" strokeLinecap="round">
                <path d="M4 6h40M76 6h40" opacity=".6" />
                <path d="M44 6c5 0 7-4 11-4 3 0 4 3 2 4" />
                <path d="M76 6c-5 0-7-4-11-4-3 0-4 3-2 4" />
                <path d="M44 6c5 0 7 4 11 4 3 0 4-3 2-4" opacity=".7" />
                <path d="M76 6c-5 0-7 4-11 4-3 0-4-3-2-4" opacity=".7" />
            </g>
            <path d="M60 1.5c2 2.5 2 6.5 0 9-2-2.5-2-6.5 0-9z" fill="var(--gold)" />
        </svg>
    );
}

function Lantern({ side, drop }) {
    return (
        <div className={`lantern lantern-${side}`} style={{ "--drop": drop }} aria-hidden="true">
            <svg viewBox="0 0 40 220" preserveAspectRatio="xMidYMax meet">
                <defs>
                    <linearGradient id={`brass-${side}`} x1="0" x2="1">
                        <stop offset="0" stopColor="#8a6428" />
                        <stop offset=".45" stopColor="#e8c47a" />
                        <stop offset="1" stopColor="#9a7030" />
                    </linearGradient>
                    <radialGradient id={`glow-${side}`} cx="50%" cy="55%" r="60%">
                        <stop offset="0" stopColor="#fff3c9" />
                        <stop offset=".6" stopColor="#f6cf7a" />
                        <stop offset="1" stopColor="#d89a3a" />
                    </radialGradient>
                </defs>
                <path d="M20 0V150" stroke="#e4c78e" strokeWidth="1" strokeDasharray="2.4 1.6" />
                <circle cx="20" cy="152" r="2.2" fill="none" stroke="#e4c78e" strokeWidth="1" />
                <path d="M12 166c0-6 4-10 8-11 4 1 8 5 8 11z" fill={`url(#brass-${side})`} />
                <rect x="10" y="165" width="20" height="3" rx="1" fill={`url(#brass-${side})`} />
                <path d="M11 168h18l2 20c0 6-5 10-11 10s-11-4-11-10z" fill={`url(#glow-${side})`} />
                <g stroke="#234f63" strokeWidth=".9" fill="none" opacity=".85">
                    <path d="M15 168l-2 24M20 168v30M25 168l2 24" />
                    <path d="M10 178h20M9.5 188h21" />
                </g>
                <path d="M11 168h18l2 20c0 6-5 10-11 10s-11-4-11-10z" fill="none" stroke={`url(#brass-${side})`} strokeWidth="1.4" />
                <path d="M14 197h12l-3 5h-6z" fill={`url(#brass-${side})`} />
                <path d="M20 202v8" stroke="#e4c78e" strokeWidth="1" />
                <path d="M17.5 210h5l-1 8h-3z" fill="#e2795b" />
            </svg>
        </div>
    );
}

export default function ScrollInvite() {
    const ref = useRef(null);
    const frameRef = useRef(null);
    const reduce = useReducedMotion();
    const [H, setH] = useState(210);

    // Measure the frame so the arch is drawn to its real proportions.
    useLayoutEffect(() => {
        const el = frameRef.current;
        if (!el) return;
        const measure = () => {
            const r = el.getBoundingClientRect();
            if (r.width) setH(Math.round((r.height / r.width) * 1000) / 10);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const done = useMotionValue(1);
    const p = reduce ? done : scrollYProgress;

    const cloth = useTransform(scrollYProgress, [0.04, 0.32], [1, 0]);
    const rollO = useTransform(scrollYProgress, [0.29, 0.34], [1, 0]);
    const frameScale = useTransform(scrollYProgress, [0, 0.06], [0.96, 1]);

    // SVG attributes are set directly so the cloth really shortens from the bottom.
    const clothRef = useRef(null);
    const rollRef = useRef(null);
    const hRef = useRef(H);
    hRef.current = H;
    const paintCloth = (v) => {
        const bottom = hRef.current - 3;
        clothRef.current?.setAttribute("height", String(Math.max(0, bottom * v)));
        rollRef.current?.setAttribute("y", String(bottom * v - 2.5));
    };
    useMotionValueEvent(cloth, "change", paintCloth);
    useEffect(() => paintCloth(cloth.get()), [H]);

    const outer = archPath(H, 0);
    const inner = archPath(H, 6.2);
    const t = (i) => 0.33 + i * 0.04;

    return (
        <section ref={ref} className="unroll" aria-label="The invitation">
            <div className="wave-pattern" aria-hidden="true" />
            <div className="unroll-stage">
                <Sprig side="left" />
                <Sprig side="right" />
                <Lantern side="l" drop="30%" />
                <Lantern side="r" drop="24%" />

                <motion.div ref={frameRef} className="arch-frame" style={{ scale: reduce ? 1 : frameScale }}>
                    <svg className="arch-svg" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                            <radialGradient id="parch" cx="50%" cy="40%" r="75%">
                                <stop offset="0" stopColor="#fffcf5" />
                                <stop offset=".72" stopColor="#faf1e0" />
                                <stop offset="1" stopColor="#f1e2c6" />
                            </radialGradient>
                        </defs>
                        <path d={outer} fill="url(#parch)" />
                    </svg>

                    <Line progress={p} at={t(0)} className="arch-crown">
                        <img src="img/ganesha-gold.webp" alt="Lord Ganesha" className="arch-ganesha" />
                    </Line>

                    <div className="arch-copy">
                        <div className="arch-group">
                            <Line progress={p} at={t(1)} as="h2" className="arch-title">
                                {invite.title}
                            </Line>
                            <Line progress={p} at={t(2)} as="p" className="arch-blessing">
                                {invite.blessing}
                            </Line>
                        </div>

                        <div className="arch-group">
                            <Line progress={p} at={t(3)}>
                                <Ornament className="arch-orn" />
                            </Line>
                            <Line progress={p} at={t(4)} className="arch-names">
                                <span>
                                    {couple.bride} <em>&amp;</em>
                                </span>
                                <span>{couple.groom}</span>
                            </Line>
                            <Line progress={p} at={t(5.2)}>
                                <Ornament className="arch-orn" />
                            </Line>
                        </div>

                        {families && (
                            <Line progress={p} at={t(6)} className="arch-group arch-parents">
                                <p>
                                    {families.bride.rel} {families.bride.parents.replace(" and ", " & ")}
                                </p>
                                <p>
                                    {families.groom.rel} {families.groom.parents.replace(" and ", " & ")}
                                </p>
                            </Line>
                        )}

                        <div className="arch-group">
                            <Line progress={p} at={t(7.4)} as="p" className="arch-date">
                                1<sup>st</sup> &amp; 2<sup>nd</sup> February 2027
                            </Line>
                            <Line progress={p} at={t(8.2)} as="p" className="arch-place">
                                {couple.place}
                            </Line>
                        </div>

                        <div className="arch-group">
                            {invite.lines.map((l, i) => (
                                <Line key={l} progress={p} at={t(9.2 + i * 0.9)} as="p" className={i ? "arch-love" : "arch-line"}>
                                    {l}
                                </Line>
                            ))}
                        </div>
                    </div>

                    <svg className="arch-svg arch-top" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                            <clipPath id="arch-clip">
                                <path d={outer} />
                            </clipPath>
                            <linearGradient id="cloth-g" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0" stopColor="#2a6a80" />
                                <stop offset=".6" stopColor="#1e5468" />
                                <stop offset="1" stopColor="#173f50" />
                            </linearGradient>
                            <pattern id="folds" width="12" height="400" patternUnits="userSpaceOnUse">
                                <rect width="12" height="400" fill="url(#cloth-g)" />
                                <rect x="0" width="3" height="400" fill="#fff" opacity=".06" />
                                <rect x="6" width="4" height="400" fill="#000" opacity=".12" />
                            </pattern>
                            <linearGradient id="roll-g" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0" stopColor="#5a98ad" />
                                <stop offset=".4" stopColor="#2a6a80" />
                                <stop offset="1" stopColor="#0f2d3a" />
                            </linearGradient>
                            <linearGradient id="gold-g" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0" stopColor="#f0d48e" />
                                <stop offset=".5" stopColor="#c39550" />
                                <stop offset="1" stopColor="#e9c983" />
                            </linearGradient>
                            <linearGradient id="ivory-g" x1="0" x2="1">
                                <stop offset="0" stopColor="#efe2c8" />
                                <stop offset=".5" stopColor="#fbf4e4" />
                                <stop offset="1" stopColor="#efe2c8" />
                            </linearGradient>
                        </defs>

                        {!reduce && (
                            <g clipPath="url(#arch-clip)">
                                <rect ref={clothRef} x="0" y="0" width="100" height={H - 3} fill="url(#folds)" />
                                <motion.rect ref={rollRef} x="-2" y={H - 5.5} width="104" height="5" rx="2.5" fill="url(#roll-g)" style={{ opacity: rollO }} />
                            </g>
                        )}

                        {/* the pillars and crown: a wide ivory band edged in gold, with a sea-blue
                            inner line and a gold bead chain, like a carved jharokha frame */}
                        <path d={outer} fill="none" stroke="url(#gold-g)" strokeWidth="1.2" vectorEffect="none" transform="translate(0 0)" />
                        <path
                            d={`${outer} ${inner}`}
                            fill="url(#ivory-g)"
                            fillRule="evenodd"
                            stroke="url(#gold-g)"
                            strokeWidth=".7"
                        />
                        <path d={archPath(H, 3.1)} fill="none" stroke="#1d4f63" strokeWidth="1.5" />
                        <path d={archPath(H, 3.1)} fill="none" stroke="#e8c983" strokeWidth=".55" strokeDasharray=".01 1.5" strokeLinecap="round" />
                        <path d={archPath(H, 7.4)} fill="none" stroke="#c39550" strokeWidth=".35" opacity=".8" />

                        {/* crown finial and base ornament */}
                        <g fill="url(#gold-g)">
                            <path d="M50 -4.5c1.8 2.2 2.2 4 0 6.6-2.2-2.6-1.8-4.4 0-6.6z" />
                            <circle cx="50" cy="3" r="1.4" />
                        </g>
                        <g transform={`translate(50 ${H - 3})`} fill="url(#gold-g)">
                            <path d="M0 -4c2 1.5 3 3 0 6-3-3-2-4.5 0-6z" />
                            <path d="M-3 0c-4-2-8 0-9 1 3 0 6 0 9-1zM3 0c4-2 8 0 9 1-3 0-6 0-9-1z" />
                        </g>
                    </svg>

                    <LotusCluster side="l" />
                    <LotusCluster side="r" />
                </motion.div>
            </div>
        </section>
    );
}
