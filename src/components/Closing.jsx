import Reveal from "./Reveal";
import { closing, couple } from "../content";

export default function Closing() {
    return (
        <footer className="closing">
            <img
                src="img/mandap-900.webp"
                srcSet="img/mandap-900.webp 900w, img/mandap-1600.webp 1448w"
                sizes="100vw"
                alt=""
                className="closing-img"
                loading="lazy"
            />
            <div className="closing-shade" />
            <div className="closing-copy">
                <Reveal delay={0.3}>
                    <svg className="closing-rule" viewBox="0 0 220 14" aria-hidden="true">
                        <path d="M4 7H92M128 7H216" stroke="var(--gold)" strokeWidth="1" fill="none" />
                        <path d="M110 1.5l4.5 5.5-4.5 5.5-4.5-5.5z" fill="var(--gold)" />
                        <circle cx="98" cy="7" r="1.6" fill="var(--gold)" />
                        <circle cx="122" cy="7" r="1.6" fill="var(--gold)" />
                    </svg>
                </Reveal>
                <Reveal as="p" delay={0.45} className="closing-note">
                    {closing.note}
                </Reveal>
                <Reveal delay={0.6} className="closing-sign">
                    <span className="caps">With love,</span>
                    <span className="closing-names">
                        {couple.bride} <em>&amp;</em> {couple.groom}
                    </span>
                    <span className="closing-families">{closing.families}</span>
                </Reveal>
            </div>
        </footer>
    );
}
