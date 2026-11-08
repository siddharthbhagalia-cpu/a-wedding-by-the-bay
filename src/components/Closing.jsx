import Reveal from "./Reveal";
import { couple, invite } from "../content";

export default function Closing() {
    return (
        <footer className="closing">
            <img src="img/mandap-900.webp" srcSet="img/mandap-900.webp 900w, img/mandap-1600.webp 1448w" sizes="100vw" alt="" className="closing-img" loading="lazy" />
            <div className="closing-shade" />
            <div className="closing-copy">
                <Reveal as="p" className="caps eyebrow">
                    {invite.lines[1]}
                </Reveal>
                <Reveal as="p" delay={0.15} className="closing-names">
                    {couple.bride} <span>&amp;</span> {couple.groom}
                </Reveal>
                <Reveal as="p" delay={0.3} className="caps closing-date">
                    {couple.datesLong} · {couple.place}
                </Reveal>
            </div>
        </footer>
    );
}
