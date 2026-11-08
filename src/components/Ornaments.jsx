// Hand-drawn style SVG ornaments in the coastal/gold palette.

export function Flourish({ className = "", color = "currentColor" }) {
    return (
        <svg className={className} viewBox="0 0 240 24" fill="none" aria-hidden="true">
            <g stroke={color} strokeWidth="1.1" strokeLinecap="round">
                <path d="M4 12h70" opacity=".55" />
                <path d="M236 12h-70" opacity=".55" />
                <path d="M74 12c10 0 14-8 22-8 6 0 8 5 4 8-4 3-9 1-9-2" />
                <path d="M166 12c-10 0-14-8-22-8-6 0-8 5-4 8 4 3 9 1 9-2" />
                <path d="M74 12c10 0 14 8 22 8 6 0 8-5 4-8" opacity=".8" />
                <path d="M166 12c-10 0-14 8-22 8-6 0-8-5-4-8" opacity=".8" />
            </g>
            {/* scallop shell centre */}
            <g transform="translate(120 12)">
                <path
                    d="M0 7c-7 0-11-5-11-10 0-3 2-5 4-6 2-2 5-3 7-3s5 1 7 3c2 1 4 3 4 6 0 5-4 10-11 10z"
                    fill={color}
                    opacity=".9"
                />
                <g stroke="#FAF3E3" strokeWidth=".8" opacity=".75">
                    <path d="M0 7V-11" />
                    <path d="M0 7l-5.5-15" />
                    <path d="M0 7l5.5-15" />
                    <path d="M0 7l-9-10" />
                    <path d="M0 7l9-10" />
                </g>
            </g>
            <circle cx="60" cy="12" r="1.6" fill={color} />
            <circle cx="180" cy="12" r="1.6" fill={color} />
        </svg>
    );
}

export function Shell({ className = "", color = "currentColor" }) {
    return (
        <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
            <path
                d="M20 36c-10 0-16-7-16-15 0-5 3-8 6-10 3-3 7-5 10-5s7 2 10 5c3 2 6 5 6 10 0 8-6 15-16 15z"
                fill={color}
            />
            <path d="M14 36h12l-2 3h-8z" fill={color} />
            <g stroke="rgba(255,255,255,.55)" strokeWidth="1" fill="none">
                <path d="M20 36V7" />
                <path d="M20 36L12 9" />
                <path d="M20 36L28 9" />
                <path d="M20 36L6 16" />
                <path d="M20 36L34 16" />
            </g>
        </svg>
    );
}

export function Starfish({ className = "", color = "currentColor" }) {
    return (
        <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
            <path
                d="M20 3c1.6 0 2.3 6 3.6 9.6 3.8.2 10.4-.4 11 1.2.5 1.6-5.2 4.8-8 7.4 1 3.6 3.6 9.7 2.3 10.7-1.3 1-6.2-3.2-8.9-5.3-2.7 2.1-7.6 6.3-8.9 5.3-1.3-1 1.3-7.1 2.3-10.7-2.8-2.6-8.5-5.8-8-7.4.6-1.6 7.2-1 11-1.2C17.7 9 18.4 3 20 3z"
                fill={color}
            />
            <g fill="rgba(255,255,255,.45)">
                <circle cx="20" cy="10" r=".9" />
                <circle cx="20" cy="15" r=".9" />
                <circle cx="29" cy="15" r=".9" />
                <circle cx="11" cy="15" r=".9" />
                <circle cx="25" cy="27" r=".9" />
                <circle cx="15" cy="27" r=".9" />
            </g>
        </svg>
    );
}

export function Pin({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
        </svg>
    );
}

export function Chevrons({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M6 7l6 5 6-5" />
            <path d="M6 13l6 5 6-5" />
        </svg>
    );
}

export function SoundIcon({ on }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" fillOpacity=".15" />
            {on ? (
                <>
                    <path d="M15.5 9a4 4 0 0 1 0 6" />
                    <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
                </>
            ) : (
                <>
                    <path d="M16 9.5l5 5" />
                    <path d="M21 9.5l-5 5" />
                </>
            )}
        </svg>
    );
}

// Falling petal shapes
export function Frangipani({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
            <defs>
                <radialGradient id="fg" cx="50%" cy="50%" r="55%">
                    <stop offset="0" stopColor="#F6C452" />
                    <stop offset=".35" stopColor="#FBE7B0" />
                    <stop offset="1" stopColor="#FFFDF6" />
                </radialGradient>
            </defs>
            {[0, 72, 144, 216, 288].map((r) => (
                <path
                    key={r}
                    transform={`rotate(${r} 20 20)`}
                    d="M20 20c-2-6-1-15 5-17 5-1 6 6 3 10-2 3-5 5-8 7z"
                    fill="url(#fg)"
                    stroke="#EBD9B0"
                    strokeWidth=".5"
                />
            ))}
            <circle cx="20" cy="20" r="2.2" fill="#F2B640" />
        </svg>
    );
}

export function BougainvilleaPetal({ size = 14, color = "#D9468F" }) {
    return (
        <svg width={size} height={size * 1.15} viewBox="0 0 20 23" aria-hidden="true">
            <path d="M10 1C4 4 1 10 2 15c1 5 5 7 8 7s7-2 8-7c1-5-2-11-8-14z" fill={color} />
            <path d="M10 3v18M10 9l-5 3M10 9l5 3M10 15l-4 3M10 15l4 3" stroke="rgba(255,255,255,.35)" strokeWidth=".7" fill="none" />
        </svg>
    );
}

// Bucket-list line icons
const ICONS = {
    fort: (
        <>
            <path d="M3 20h18M5 20V10h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v10" />
            <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
            <path d="M2 22c2-1 4-1 6 0s4 1 6 0 4-1 6 0" opacity=".6" />
        </>
    ),
    cave: (
        <>
            <path d="M2 20L8 7l3 4 2-3 9 12z" />
            <path d="M9 20c0-4 1.5-6 3-6s3 2 3 6" />
        </>
    ),
    lighthouse: (
        <>
            <path d="M9 21l1.5-13h3L15 21z" />
            <path d="M9.5 8h5V6l-2.5-2-2.5 2z" />
            <path d="M4 5.5l4 1.5M20 5.5l-4 1.5" opacity=".7" />
            <path d="M10 13h4M9.6 17h4.8" />
        </>
    ),
    temple: (
        <>
            <path d="M12 2v2M8 10l4-6 4 6" />
            <path d="M6 21V12h12v9M4 21h16" />
            <path d="M6 12l6-2 6 2" />
            <path d="M10.5 21v-4a1.5 1.5 0 0 1 3 0v4" />
        </>
    ),
    hill: (
        <>
            <path d="M2 20l6-9 4 5 3-4 7 8z" />
            <circle cx="17" cy="6" r="2" />
        </>
    ),
    dolphin: (
        <>
            <path d="M3 15c3-6 9-9 15-7l3-2-1 4c1 2 1 4 0 6-2-2-5-3-8-2-3 1-5 2-9 1z" />
            <path d="M10 9l1-3 2 2.5" />
            <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" opacity=".6" />
        </>
    ),
    beach: (
        <>
            <path d="M12 3v15" />
            <path d="M4 9a8 8 0 0 1 16 0c-2.6-1.4-5.4-1.4-8 0-2.6-1.4-5.4-1.4-8 0z" />
            <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
        </>
    ),
};

export function PlaceIcon({ name, className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
            {ICONS[name] || ICONS.beach}
        </svg>
    );
}
