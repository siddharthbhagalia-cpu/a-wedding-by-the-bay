// Smoothly glide to an element, using the page's Lenis smooth-scroller when present.
// `offset` is the space (px) to leave above the target once it arrives.
export function glideTo(selector, offset = 0) {
    const el = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -offset, duration: 2.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
}
