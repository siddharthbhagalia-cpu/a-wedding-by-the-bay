import Reveal from "./Reveal";
import { Flourish, PlaceIcon } from "./Ornaments";
import { getaway, mapsLink } from "../content";

export default function Getaway() {
    return (
        <section className="getaway" id="getaway">
            <header className="section-head">
                <Reveal as="p" className="caps eyebrow">
                    {getaway.eyebrow}
                </Reveal>
                <Reveal as="h2" delay={0.12} className="display">
                    {getaway.title}
                </Reveal>
                <Reveal as="p" delay={0.24} className="body-lg narrow">
                    {getaway.text}
                </Reveal>
            </header>

            <div className="journal">
                <Reveal as="h3" className="script-title">
                    {getaway.listTitle}
                </Reveal>
                <Flourish className="flourish" color="var(--gold)" />
                <ol className="bucket">
                    {getaway.places.map((pl, i) => (
                        <Reveal as="li" key={pl.name} delay={(i % 3) * 0.08} y={18} amount={0.6}>
                            <a href={mapsLink(pl.q)} target="_blank" rel="noreferrer" className="bucket-item">
                                <span className="bucket-num">{String(i + 1).padStart(2, "0")}</span>
                                <PlaceIcon name={pl.icon} className="bucket-icon" />
                                <span className="bucket-name">{pl.name}</span>
                                <span className="bucket-arrow" aria-hidden="true">
                                    ↗
                                </span>
                            </a>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
