import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Chevrons } from "./Ornaments";
import { couple } from "../content";

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

                <motion.div className="hero-copy" style={{ opacity: textO, y: textY }}>
                    <motion.img src="img/ganpati.webp" alt="Lord Ganesha" className="hero-ganesha" {...step(0)} />
                    <h1 className="hero-names">
                        <motion.span className="hero-name" {...step(1)}>
                            {couple.bride}
                        </motion.span>
                        <motion.span className="hero-amp" {...step(1.6)}>
                            &amp;
                        </motion.span>
                        <motion.span className="hero-name" {...step(2.2)}>
                            {couple.groom}
                        </motion.span>
                    </h1>
                    <motion.p className="hero-date" {...step(3.2)}>
                        {couple.heroDates}
                    </motion.p>
                    <motion.p className="caps hero-place" {...step(3.7)}>
                        {couple.place}
                    </motion.p>
                </motion.div>

                <motion.div className="scroll-cue" style={{ opacity: cueO }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={ready ? { opacity: 1 } : {}}
                        transition={{ delay: 3.4, duration: 1.2 }}
                    >
                        <span className="caps">Scroll</span>
                        <Chevrons className="cue-chev" />
                    </motion.div>
                </motion.div>

                <motion.div className="hero-fade" style={{ opacity: fadeO }} />
            </div>
        </section>
    );
}
