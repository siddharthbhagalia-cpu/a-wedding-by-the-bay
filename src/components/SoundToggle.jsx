import { useEffect, useState } from "react";
import { isPlaying, subscribe, toggle } from "../lib/audio";
import { SoundIcon } from "./Ornaments";

export default function SoundToggle({ visible }) {
    const [on, setOn] = useState(isPlaying());
    useEffect(() => subscribe(setOn), []);
    if (!visible) return null;
    return (
        <button
            type="button"
            className={`sound ${on ? "on" : ""}`}
            onClick={toggle}
            aria-label={on ? "Mute sea sounds" : "Play sea sounds"}
            aria-pressed={on}
        >
            <SoundIcon on={on} />
        </button>
    );
}
