import { useMemo } from "react";
import { Frangipani, BougainvilleaPetal } from "./Ornaments";

const PINKS = ["#D9468F", "#E56AA6", "#C93C7E", "#EE8DB8"];

// Deterministic pseudo-random so the layout is stable between renders.
const rnd = (i, n) => {
    const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
    return x - Math.floor(x);
};

export default function Petals({ count = 18, className = "" }) {
    const petals = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                left: rnd(i, 1) * 100,
                frangipani: false,
                size: 9 + rnd(i, 2) * 9,
                fall: 11 + rnd(i, 3) * 10,
                sway: 2.6 + rnd(i, 5) * 2.4,
                delay: -rnd(i, 4) * 20,
                drift: (rnd(i, 6) - 0.5) * 80,
                color: PINKS[i % PINKS.length],
                opacity: 0.75 + rnd(i, 7) * 0.25,
            })),
        [count],
    );

    return (
        <div aria-hidden="true" className={`petals ${className}`}>
            {petals.map((p, i) => (
                <span
                    key={i}
                    className="petal"
                    style={{
                        left: `${p.left}%`,
                        opacity: p.opacity,
                        animationDuration: `${p.fall}s`,
                        animationDelay: `${p.delay}s`,
                        "--drift": `${p.drift}px`,
                    }}
                >
                    <span
                        className="petal-sway"
                        style={{ animationDuration: `${p.sway}s`, animationDelay: `${p.delay}s` }}
                    >
                        {p.frangipani ? (
                            <Frangipani size={p.size} />
                        ) : (
                            <BougainvilleaPetal size={p.size} color={p.color} />
                        )}
                    </span>
                </span>
            ))}
        </div>
    );
}
