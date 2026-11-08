import Reveal from "./Reveal";
import { Flourish } from "./Ornaments";
import { rsvp } from "../content";

// RSVPs are being collected manually for now, so this section is text only.
// The earlier Google Sheets form is in git history if it's needed again.
export default function Rsvp() {
    return (
        <section className="rsvp" id="rsvp">
            <div className="wave-pattern" aria-hidden="true" />
            <header className="section-head light">
                <Reveal as="p" className="caps eyebrow">
                    {rsvp.eyebrow}
                </Reveal>
                <Reveal as="h2" delay={0.12} className="display">
                    {rsvp.title}
                </Reveal>
                <Reveal delay={0.2}>
                    <Flourish className="flourish" color="var(--gold-soft)" />
                </Reveal>
                {rsvp.paragraphs.map((t, i) => (
                    <Reveal key={i} as="p" delay={0.25 + i * 0.1} className="body-lg narrow">
                        {t}
                    </Reveal>
                ))}
            </header>

            <Reveal as="p" className="tip">
                {rsvp.tip}
            </Reveal>
        </section>
    );
}
