// ─────────────────────────────────────────────────────────────
//  All the words, dates and links on the site live in this file.
//  Edit here, rebuild, re-upload. Nothing else needs touching.
// ─────────────────────────────────────────────────────────────

// Paste your Google Apps Script "Web app" URL here (see HOSTING.md).
// Until it's set, the RSVP form shows a friendly "not open yet" note.
export const RSVP_ENDPOINT =
    import.meta.env.VITE_RSVP_ENDPOINT ||
    "";

const VENUE_QUERY = "Sagar Sawali Beach Resort, Ladghar, Dapoli";
export const mapsLink = (q) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const couple = {
    bride: "Gauraangi",
    groom: "Siddharth",
    heroDates: "1st & 2nd February, 2027",
    datesLong: "1–2 February, 2027",
    place: "Dapoli, Konkan",
};

export const invite = {
    title: "A Wedding by the Bay",
    blessing:
        "With the blessings of Lord Ganesha, we've picked a date, found a view, and saved you a place.",
    lines: [
        "Two days by the sea. A few celebrations. All our favourite people.",
        "We'd love to have you there.",
    ],
};

export const celebrations = {
    eyebrow: "A date with the Konkan coast. And three very good ways to celebrate.",
    title: "The Celebrations",
    events: [
        {
            slug: "haldi",
            name: "The Haldi",
            when: "Monday, 1st Feb, 2027",
            time: "5:00 PM",
            venue: "Poolside, Sagar Sawali Beach Resort, Ladghar",
            text: "A little sunshine, a whole lot of haldi, and all the happy chaos that comes along.",
            image: "img/haldi-900.webp",
            accent: "#E9A23B",
            map: mapsLink(VENUE_QUERY),
        },
        {
            slug: "sundowner",
            name: "The Sundowner",
            when: "Monday, 1st Feb, 2027",
            time: "7:00 PM",
            venue: "Sagar Sawali Beach Resort Lawn, Ladghar",
            text: "As the sun clocks out, the celebrations turn up. Expect good music, great company and a night worth staying up for.",
            image: "img/sundowner-900.webp",
            accent: "#E2795B",
            map: mapsLink(VENUE_QUERY),
        },
        {
            slug: "wedding",
            name: "A Wedding by the Bay",
            when: "Tuesday, 2nd Feb, 2027",
            time: "12:00 PM",
            venue: "Sagar Sawali Beach Resort Lawn, Ladghar",
            text: "The big day, the blissful setting, and the beginning of a beautiful journey.",
            image: "img/mandap-900.webp",
            accent: "#D98C8C",
            map: mapsLink(VENUE_QUERY),
            families: {
                bride: { name: "Gauraangi", rel: "Daughter of", parents: "Smt. Bhavna Ramani and Shri Mukesh Ramani" },
                groom: { name: "Siddharth", rel: "Son of", parents: "Smt. Alpa Bhagalia and Shri Mukesh Bhagalia" },
            },
        },
    ],
};

export const setting = {
    eyebrow: "The Setting",
    title: "Beaches or mountains? We wanted both.",
    paragraphs: [
        "We've always found it difficult to pick a favourite. Give us a view of the hills in the morning and a beach to wind down at in the evening, and we're pretty happy.",
        "That's what brought us to Dapoli. And now, we get to share a little of what we love about this place with all of you.",
    ],
    venue: "Sagar Sawali Beach Resort, Dapoli, Konkan, Maharashtra.",
    map: mapsLink(VENUE_QUERY),
};

// Gallery: drop your photos into /public/gallery/ and list them here.
// Portrait or landscape both work. `caption` is optional.
export const gallery = {
    intro: "Here's a glimpse of Dapoli, from our gallery.",
    photos: [
        // Add more by dropping files into public/gallery/ and listing them here.
        { src: "gallery/bay-through-trees.webp", caption: "The bay, through the trees" },
        { src: "gallery/parshuram-bhumi.webp", caption: "Parshuram Bhumi" },
        { src: "gallery/monsoon-coast.webp", caption: "Palms on the Konkan coast" },
        { src: "gallery/moonlit-cottages.webp", caption: "Moonlight at the cottages" },
        { src: "gallery/lawns-by-the-sea.webp", caption: "The lawns, by the sea" },
    ],
};

export const getaway = {
    eyebrow: "Stay a little longer",
    title: "Since you've already taken a few days off, why not make a holiday of it?",
    text: "Once the celebrations are over, there's plenty of Konkan left to explore. From beaches and forts to local markets and dolphin spotting, here's a little list of places worth visiting before you head back.",
    listTitle: "Your little Konkan bucket list",
    places: [
        { name: "Suvarnadurg Sea Fort", icon: "fort", q: "Suvarnadurg Fort, Harnai" },
        { name: "Panhalekaji Caves", icon: "cave", q: "Panhalekaji Caves, Dapoli" },
        { name: "Savane Lighthouse", icon: "lighthouse", q: "Savane Lighthouse, Dapoli" },
        { name: "Keshavraj Temple", icon: "temple", q: "Keshavraj Temple, Asud, Dapoli" },
        { name: "Parshuram Bhumi", icon: "hill", q: "Parshuram Bhumi, Burondi, Dapoli" },
        { name: "Veleshwar Mandir", icon: "temple", q: "Veleshwar Temple, Dapoli" },
        { name: "Dolphin Watching Point", icon: "dolphin", q: "Dolphin point Harnai Dapoli" },
        { name: "Ladghar Beach", icon: "beach", q: "Ladghar Beach, Dapoli" },
        { name: "Kadyavarcha Ganpati", icon: "temple", q: "Kadyavarcha Ganpati Temple, Anjarle" },
    ],
};

export const rsvp = {
    eyebrow: "RSVP",
    title: "So, are we saving you a seat by the sea?",
    paragraphs: [
        "We've got the dates, the destination and a whole lot planned. Now we'd just like to know if you're in.",
        "Tell us who's coming along and which celebrations we'll get to share with you.",
    ],
    tip: "Pro tip: Pack your dancing shoes, a lot of love, and a little extra time.",
    thanks: {
        title: "We've saved you a seat by the sea.",
        text: "Thank you — your RSVP is in. We can't wait to celebrate with you in Dapoli.",
    },
};

export const closing = {
    eyebrow: "Counting down to the bay",
    note: "See you by the sea.",
    families: "The Ramani & Bhagalia families",
    during: "Today's the day! We're so glad you're here.",
    after: "Thank you for celebrating with us by the bay.",
};
