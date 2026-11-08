import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Reveal({ children, delay = 0, y = 28, className = "", as = "div", amount = 0.35 }) {
    const M = motion[as];
    return (
        <M
            className={className}
            initial={{ opacity: 0, y, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount }}
            transition={{ duration: 1.1, delay, ease }}
        >
            {children}
        </M>
    );
}
