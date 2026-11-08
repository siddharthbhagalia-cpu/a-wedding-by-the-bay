import { useEffect, useState } from "react";
import Lenis from "lenis";
import Veil from "./components/Veil";
import Hero from "./components/Hero";
import ScrollInvite from "./components/ScrollInvite";
import Celebrations from "./components/Celebrations";
import { Setting, Gallery } from "./components/Setting";
import Rsvp from "./components/Rsvp";
import Closing from "./components/Closing";
import SoundToggle from "./components/SoundToggle";
import Petals from "./components/Petals";

export default function App() {
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        if ("scrollRestoration" in history) history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.85, touchMultiplier: 1.1, anchors: { offset: 0, duration: 2.4 } });
        let id;
        const raf = (t) => {
            lenis.raf(t);
            id = requestAnimationFrame(raf);
        };
        id = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(id);
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Veil onOpen={() => setOpened(true)} />
            <main>
                <Hero ready={opened} />
                <ScrollInvite />
                <Celebrations />
                <Setting />
                <Gallery />
                <Rsvp />
                <Closing />
            </main>
            {opened && <Petals count={18} className="petals-global" />}
            <SoundToggle visible={opened} />
        </>
    );
}
