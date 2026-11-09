import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { Flourish, Pin } from "./Ornaments";
import { setting, gallery } from "../content";

// Muted, looping, inline video that plays while it's on screen.
// The tag is written as raw HTML because React doesn't output the `muted`
// attribute, and iPhones refuse to autoplay a video without it.
const VIDEO_HTML =
    '<video class="setting-video" src="video/dapoli.mp4" poster="video/dapoli-poster.webp" ' +
    'muted autoplay loop playsinline webkit-playsinline preload="auto" disablepictureinpicture ' +
    'aria-label="The lawns of Sagar Sawali Beach Resort looking out to the sea at Ladghar"></video>';

function SettingVideo() {
    const ref = useRef(null);
    useEffect(() => {
        const v = ref.current?.querySelector("video");
        if (!v) return;
        v.muted = true;
        v.defaultMuted = true;
        let visible = false;
        const play = () => v.play().catch(() => {});
        const io = new IntersectionObserver(
            ([e]) => {
                visible = e.isIntersecting;
                visible ? play() : v.pause();
            },
            { threshold: 0.2 },
        );
        io.observe(v);
        // The opening tap is a user gesture: use it to give the video permission to play.
        const unlock = () =>
            v
                .play()
                .then(() => !visible && v.pause())
                .catch(() => {});
        window.addEventListener("wbb:unlock", unlock);
        // Fallback (e.g. iPhone Low Power Mode blocks autoplay): tapping the video plays it.
        v.addEventListener("click", play);
        return () => {
            io.disconnect();
            window.removeEventListener("wbb:unlock", unlock);
            v.removeEventListener("click", play);
        };
    }, []);
    return <div ref={ref} className="setting-video-wrap" dangerouslySetInnerHTML={{ __html: VIDEO_HTML }} />;
}

export function Setting() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const mapY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const mapR = useTransform(scrollYProgress, [0, 1], [-2.5, 1.5]);

    return (
        <section className="setting" id="setting" ref={ref}>
            <header className="section-head">
                <Reveal as="p" className="caps eyebrow">
                    {setting.eyebrow}
                </Reveal>
                <Reveal as="h2" delay={0.12} className="display">
                    {setting.title}
                </Reveal>
                <Reveal delay={0.24}>
                    <Flourish className="flourish" color="var(--gold)" />
                </Reveal>
            </header>
            <div className="setting-grid">
                <div className="setting-text">
                    {setting.paragraphs.map((t, i) => (
                        <Reveal key={i} as="p" delay={0.1 * i} className="body-lg">
                            {t}
                        </Reveal>
                    ))}
                </div>
                <motion.figure className="map-card" style={{ y: mapY, rotate: mapR }}>
                    <SettingVideo />
                    <figcaption>
                        <Pin className="pin" />
                        <span>{setting.venue}</span>
                    </figcaption>
                </motion.figure>
            </div>
            <Reveal className="center">
                <a className="swipe-hint cta-pill" href={setting.map} target="_blank" rel="noreferrer">
                    <Pin className="swipe-hand cta-pin" />
                    <span className="caps">Open in Google Maps</span>
                    <span className="swipe-arrow" aria-hidden="true">
                        →
                    </span>
                </a>
            </Reveal>
        </section>
    );
}

export function Gallery() {
    const rowRef = useRef(null);
    // Tapping the hint moves the row along by one photo (and back to the start at the end).
    const nextPhoto = () => {
        const row = rowRef.current;
        if (!row) return;
        const card = row.querySelector(".polaroid");
        const step = card ? card.getBoundingClientRect().width + 22 : row.clientWidth * 0.8;
        const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 8;
        row.scrollTo({ left: atEnd ? 0 : row.scrollLeft + step, behavior: "smooth" });
    };
    return (
        <section className="gallery" id="gallery">
            <header className="section-head">
                <Reveal as="p" className="caps eyebrow">
                    A glimpse from our gallery
                </Reveal>
                <Reveal as="h2" delay={0.12} className="script-title">
                    {gallery.intro}
                </Reveal>
            </header>
            <div ref={rowRef} className="polaroids" tabIndex={0} aria-label="Photo gallery, swipe to see more">
                {gallery.photos.map((ph, i) => (
                    <motion.figure
                        key={ph.src + i}
                        className="polaroid"
                        style={{ rotate: [-4, 3, -2, 4, -3, 2][i % 6] }}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img src={ph.src} alt={ph.caption || "Dapoli"} loading="lazy" />
                        {ph.caption && <figcaption>{ph.caption}</figcaption>}
                    </motion.figure>
                ))}
            </div>
            <button type="button" className="swipe-hint" onClick={nextPhoto}>
                <svg className="swipe-hand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
                    <path d="M12 10.5V9a1.5 1.5 0 0 1 3 0v2" />
                    <path d="M15 10.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.6a5 5 0 0 1-4.2-2.3L4.6 14a1.5 1.5 0 0 1 2.4-1.8L9 14" />
                </svg>
                <span className="caps">Swipe to see more photos</span>
                <span className="swipe-arrow" aria-hidden="true">→</span>
            </button>
        </section>
    );
}
