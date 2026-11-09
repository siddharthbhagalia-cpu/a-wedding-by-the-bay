import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { closing, couple } from "../content";

// Countdown to the first celebration (The Haldi, 1 Feb 2027, 5:00 PM IST).
const START = new Date("2027-02-01T17:00:00+05:30").getTime();
const END = new Date("2027-02-03T00:00:00+05:30").getTime();

function useCountdown() {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    const diff = Math.max(0, START - now);
    return {
        phase: now < START ? "before" : now < END ? "during" : "after",
        days: Math.floor(diff / 864e5),
        hours: Math.floor(diff / 36e5) % 24,
        mins: Math.floor(diff / 6e4) % 60,
        secs: Math.floor(diff / 1e3) % 60,
    };
}

function Countdown() {
    const c = useCountdown();
    if (c.phase === "during") return <p className="cd-message">{closing.during}</p>;
    if (c.phase === "after") return <p className="cd-message">{closing.after}</p>;
    const units = [
        [c.days, c.days === 1 ? "Day" : "Days"],
        [c.hours, "Hours"],
        [c.mins, "Minutes"],
        [c.secs, "Seconds"],
    ];
    return (
        <div className="countdown" role="timer" aria-label={`${c.days} days to go`}>
            {units.map(([n, label], i) => (
                <div className="cd-unit" key={label}>
                    <span className="cd-num">{String(n).padStart(i ? 2 : 1, "0")}</span>
                    <span className="caps cd-label">{label}</span>
                </div>
            ))}
        </div>
    );
}

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
                <Reveal as="p" className="caps eyebrow">
                    {closing.eyebrow}
                </Reveal>
                <Reveal delay={0.15}>
                    <Countdown />
                </Reveal>
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
