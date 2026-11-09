import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Chevrons } from "./Ornaments";
import { couple } from "../content";
import { glideTo } from "../lib/scroll";

const ease = [0.22, 1, 0.36, 1];

// One swaying frangipani sprig that hangs into the frame from a top corner.
// A painted bougainvillea cluster (lifted from the opening watercolour) that hangs
// into the frame from a top corner and sways gently.
export function Sprig({ side }) {
    return (
        <div className={`sprig sprig-${side}`} aria-hidden="true">
            <img src="img/bougainvillea.webp" alt="" className="sprig-svg" />
        </div>
    );
}

// A name that writes itself in letter by letter, then catches a sweep of gold light.
function Name({ text, ready, delay }) {
    return (
        <span className="hero-name" aria-label={text}>
            <span className="name-letters" aria-hidden="true">
                {[...text].map((ch, i) => (
                    <motion.span
                        key={i}
                        className="name-letter"
                        initial={{ opacity: 0, y: "0.35em", filter: "blur(8px)" }}
                        animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                        transition={{ delay: delay + i * 0.07, duration: 0.9, ease }}
                    >
                        {ch}
                    </motion.span>
                ))}
            </span>
            {ready && (
                <span className="name-shine" aria-hidden="true" style={{ "--shine-delay": `${delay + text.length * 0.07 + 0.6}s` }}>
                    {text}
                </span>
            )}
        </span>
    );
}

// Tiny glints of sunlight twinkling on the sea.
const GLINTS = Array.from({ length: 16 }, (_, i) => {
    const r = (n) => {
        const x = Math.sin(i * 91.7 + n * 47.3) * 43758.5453;
        return x - Math.floor(x);
    };
    return { left: 6 + r(1) * 88, top: 47 + r(2) * 14, size: 2 + r(3) * 3, delay: r(4) * 4, dur: 2.2 + r(5) * 2.4 };
});

export default function Hero({ ready }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
    const textO = useTransform(scrollYProgress, [0.08, 0.45], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -90]);
    const cueO = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const fadeO = useTransform(scrollYProgress, [0.35, 0.95], [0, 1]);

    const step = (i) => ({
        initial: { opacity: 0, y: 22, filter: "blur(6px)" },
        animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
        transition: { delay: 0.9 + i * 0.35, duration: 1.4, ease },
    });

    return (
        <section ref={ref} className="hero" aria-label="Gauraangi and Siddharth">
            <div className="hero-stage">
                <motion.div
                    className="hero-img-wrap"
                    style={{ scale: imgScale, y: imgY }}
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : {}}
                    transition={{ duration: 2, ease }}
                >
                    <motion.img
                        src="img/closing-900.webp"
                        srcSet="img/closing-900.webp 900w, img/closing-1600.webp 1264w"
                        sizes="100vw"
                        alt="Watercolour of the Konkan sea at sunset framed by bougainvillea and palms"
                        className="hero-img"
                        initial={{ scale: 1.1 }}
                        animate={ready ? { scale: 1 } : {}}
                        transition={{ duration: 6, ease }}
                    />
                </motion.div>
                <div className="hero-sky" />

                <Sprig side="left" />
                <Sprig side="right" />

                {ready && (
                    <div className="glints" aria-hidden="true">
                        {GLINTS.map((g, i) => (
                            <span
                                key={i}
                                style={{
                                    left: `${g.left}%`,
                                    top: `${g.top}%`,
                                    width: g.size,
                                    height: g.size,
                                    animationDelay: `${g.delay}s`,
                                    animationDuration: `${g.dur}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                <motion.div className="hero-copy" style={{ opacity: textO, y: textY }}>
                    <motion.div className="ganesha-wrap" {...step(0)}>
                        <span className="ganesha-halo" aria-hidden="true" />
                        <img src="img/ganpati.webp" alt="Lord Ganesha" className="hero-ganesha" />
                    </motion.div>
                    <h1 className="hero-names">
                        <Name text={couple.bride} ready={ready} delay={1.25} />
                        <motion.span className="hero-amp" {...step(2.6)}>
                            &amp;
                        </motion.span>
                        <Name text={couple.groom} ready={ready} delay={2.2} />
                    </h1>
                    <svg className="hero-rule" viewBox="0 0 220 14" aria-hidden="true">
                        <motion.path
                            d="M4 7H92M128 7H216"
                            stroke="var(--gold)"
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={ready ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ delay: 3.4, duration: 1.4, ease }}
                        />
                        <motion.path
                            d="M110 1.5l4.5 5.5-4.5 5.5-4.5-5.5z"
                            fill="var(--gold)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={ready ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: 3.9, duration: 0.7, ease }}
                            style={{ originX: "110px", originY: "7px" }}
                        />
                        <motion.circle cx="98" cy="7" r="1.6" fill="var(--gold)" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 4.1 }} />
                        <motion.circle cx="122" cy="7" r="1.6" fill="var(--gold)" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 4.1 }} />
                    </svg>
                    <motion.div className="hero-when" {...step(10.6)}>
                        <p className="hero-date">{couple.heroDates}</p>
                        <p className="caps hero-place">{couple.place}</p>
                    </motion.div>
                </motion.div>

                <motion.div className="scroll-cue" style={{ opacity: cueO }}>
                    <motion.button
                        type="button"
                        onClick={() => glideTo(".unroll")}
                        aria-label="Scroll to the invitation"
                        initial={{ opacity: 0 }}
                        animate={ready ? { opacity: 1 } : {}}
                        transition={{ delay: 6.2, duration: 1.2 }}
                    >
                        <span className="caps">Scroll</span>
                        <Chevrons className="cue-chev" />
                    </motion.button>
                </motion.div>

                <motion.div className="hero-fade" style={{ opacity: fadeO }} />
            </div>
        </section>
    );
}
