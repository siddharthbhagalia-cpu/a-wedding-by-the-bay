import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { start as startAudio } from "../lib/audio";

const ease = [0.22, 1, 0.36, 1];

export default function Veil({ onOpen }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        document.documentElement.classList.toggle("locked", open);
    }, [open]);

    const begin = () => {
        if (!open) return;
        startAudio();
        window.dispatchEvent(new Event("wbb:unlock"));
        setOpen(false);
        onOpen?.();
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.button
                    type="button"
                    className="veil"
                    onClick={begin}
                    aria-label="Tap to know about A Wedding By The Bay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.4, ease } }}
                >
                    <motion.img
                        src="img/scene-900.webp"
                        srcSet="img/scene-900.webp 900w, img/scene-1600.webp 1448w"
                        sizes="100vw"
                        alt=""
                        className="veil-img"
                        initial={{ scale: 1.08, opacity: 1 }}
                        animate={{ scale: 1.02 }}
                        exit={{ scale: 1.08, filter: "blur(6px) brightness(1.4)" }}
                        transition={{ duration: 3.2, ease }}
                    />
                    <div className="veil-shade" />
                    <motion.div
                        className="veil-copy"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, transition: { duration: 0.6 } }}
                        transition={{ delay: 0.8, duration: 1.2, ease }}
                    >
                        <img src="img/ganpati.webp" alt="" className="veil-ganesha" />
                        <span className="caps veil-caps">Tap to know about</span>
                        <span className="veil-script">A Wedding By The Bay</span>
                        <span className="veil-ring" aria-hidden="true">
                            <span />
                        </span>
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
