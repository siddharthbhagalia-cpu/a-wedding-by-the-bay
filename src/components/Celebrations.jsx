import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { Flourish, Pin, Shell } from "./Ornaments";
import { celebrations } from "../content";

const ease = [0.22, 1, 0.36, 1];

function EventCard({ ev, index }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <motion.article
            ref={ref}
            className="event"
            style={{ "--accent": ev.accent }}
            initial={{ opacity: 0, y: 120, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 1.3, ease }}
        >
            <span className="caps event-num">Event 0{index + 1}</span>
            <div className="arch">
                <motion.img src={ev.image} alt="" className="arch-img" style={{ y: imgY }} loading="lazy" />
                <div className="arch-glow" />
            </div>

            <div className="event-body">
                <h3 className="event-name">{ev.name}</h3>
                <p className="caps event-when">
                    {ev.when} <span className="bar">|</span> {ev.time}
                </p>
                <p className="event-venue">
                    <Pin className="pin" />
                    <span>{ev.venue}</span>
                </p>
                <p className="event-text">{ev.text}</p>

                {ev.families && (
                    <div className="families">
                        <div className="fam">
                            <span className="fam-name">{ev.families.bride.name}</span>
                            <span className="caps fam-rel">{ev.families.bride.rel}</span>
                            <span className="fam-parents">{ev.families.bride.parents}</span>
                        </div>
                        <span className="fam-amp">weds</span>
                        <div className="fam">
                            <span className="fam-name">{ev.families.groom.name}</span>
                            <span className="caps fam-rel">{ev.families.groom.rel}</span>
                            <span className="fam-parents">{ev.families.groom.parents}</span>
                        </div>
                    </div>
                )}

            </div>
            <Shell className="event-shell" color="var(--gold)" />
        </motion.article>
    );
}

export default function Celebrations() {
    return (
        <section className="celebrations" id="celebrations">
            <div className="wave-pattern" aria-hidden="true" />
            <header className="section-head light">
                <Reveal as="p" className="caps eyebrow">
                    {celebrations.eyebrow}
                </Reveal>
                <Reveal as="h2" delay={0.15} className="display">
                    {celebrations.title}
                </Reveal>
                <Reveal delay={0.3}>
                    <Flourish className="flourish" color="var(--gold-soft)" />
                </Reveal>
            </header>
            <div className="events">
                {celebrations.events.map((ev, i) => (
                    <EventCard key={ev.slug} ev={ev} index={i} />
                ))}
            </div>
        </section>
    );
}
