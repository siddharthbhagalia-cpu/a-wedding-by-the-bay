# A Wedding by the Bay — Gauraangi & Siddharth

The invitation website for 1–2 February 2027 in Dapoli, Konkan. It's a static site: no server and no database. RSVPs are collected manually for now, so the site has no form.

**To put it online, see [HOSTING.md](HOSTING.md).**

## The flow

1. **Tap to know about A Wedding By The Bay.** A watercolour sunset seascape sits behind the opening screen. The tap also starts the music and waves, which browsers only allow after a tap.
2. **Hero.** A sunset seascape with frangipani sprigs swaying at the corners. Petals fall from here to the end of the page. The Ganesha icon, the names, the dates and Dapoli, Konkan fade in one after another.
3. **The invitation scroll.** As you scroll, a sea-blue cloth on a driftwood rod rolls up to show a parchment. The invitation text then writes itself in, line by line.
4. **The Celebrations.** Arch-shaped cards for The Haldi, The Sundowner and A Wedding by the Bay, with date, time, venue and the families.
5. **The Setting.** Beaches or mountains, with a looping video of the resort and the venue pin.
6. **A glimpse from our gallery.** A row of polaroid-style photos you can swipe through.
7. **RSVP.** The invitation to RSVP and the pro tip. There's no form for now.
8. **Closing.** The names, dates and place one last time.

## Project layout

```
src/content.js            ← all copy, dates, venues and the gallery list
src/components/            ← one file per section
src/lib/audio.js           ← music and waves (Web Audio, gapless loops)
src/styles.css             ← palette, type and every section's styling
public/img, audio, video   ← optimised artwork, sound and the resort video
google-sheet/rsvp-script.gs← only needed if the RSVP form comes back
```

The stack is Vite, React 18, framer-motion (for the scroll-linked animation) and Lenis (for smooth scrolling). Fonts are bundled with the site: Cormorant Garamond, Great Vibes and Karla.

If a visitor's phone has "reduce motion" turned on, the scroll animations and petals are switched off and everything is simply shown.
