"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { asset } from "@/lib/site";

/**
 * The motion layer. Markup and copy live in page.tsx (so crawlers see everything);
 * this component choreographs it as one continuous reel.
 */
export default function Showreel() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));

    // Momo in the hero reacts to the speech bubble.
    const kid = $<HTMLImageElement>("#heroKid");
    const onMood = (e: Event) => {
      const m = (e as CustomEvent<string>).detail;
      if (kid) kid.src = asset(`/media/pets/kid-${m}.png`);
      if (!reduce && kid && m === "happy") gsap.fromTo(kid, { y: 0 }, { y: -50, duration: 0.25, yoyo: true, repeat: 5, ease: "power2.out" });
    };
    window.addEventListener("pawse:mood", onMood);
    if (reduce) return () => window.removeEventListener("pawse:mood", onMood);

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync.
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => { const t = a.getAttribute("href")!; if (t.length > 1) { e.preventDefault(); lenis.scrollTo(t, { offset: -20 }); } }));

    const mm = gsap.matchMedia();
    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      /* ── Scene 1: opening sequence ───────────────────────────── */
      const mega = new SplitText("[data-mega]", { type: "chars", charsClass: "char", mask: "chars" });
      splits.push(mega);
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(".blob", { scale: 0.4, opacity: 0, duration: 2.2, stagger: 0.15 })
        .from(mega.chars, { yPercent: 115, rotate: 8, duration: 1.4, stagger: 0.045 }, 0.15)
        .from("[data-hero-in]", { y: 30, opacity: 0, duration: 1.2, stagger: 0.12 }, 0.6)
        .from(".float", { scale: 0, rotate: () => gsap.utils.random(-25, 25), opacity: 0, duration: 1.4, stagger: 0.09, ease: "back.out(1.7)" }, 0.75)
        .from("[data-reveal-hero]", { y: 40, scale: 0.9, opacity: 0, duration: 1.1, ease: "back.out(1.6)" }, 1.1)
        .from(".marquee", { yPercent: 100, opacity: 0, duration: 1 }, 1.2)
        .from("nav", { y: -40, opacity: 0, duration: 1 }, 0.9);

      // Leaving the hero: letters drift apart, pets scatter with depth.
      gsap.to("[data-mega]", {
        yPercent: -35, scale: 1.12, opacity: 0.12, filter: "blur(6px)", transformOrigin: "0% 100%", ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      });
      $$(".float").forEach((f) => {
        const d = Number(f.dataset.depth || 20);
        gsap.to(f, { y: -d * 9, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
      });
      // idle bob on every floating pet
      $$(".float img").forEach((img, i) => gsap.to(img, { y: -14, duration: 2 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut" }));

      // Marquee whose speed and skew follow scroll velocity.
      const track = $(".marquee .track");
      if (track) {
        const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        const skew = gsap.quickTo(track, "skewX", { duration: 0.4 });
        ScrollTrigger.create({
          onUpdate: (st) => {
            const v = st.getVelocity() / 300;
            loop.timeScale(gsap.utils.clamp(-6, 6, 1 + v * (st.direction)));
            skew(gsap.utils.clamp(-12, 12, -v));
          },
        });
      }

      /* ── Scene 2: manifesto fills in word by word ─────────────── */
      const man = new SplitText("[data-manifesto]", { type: "words", wordsClass: "word" });
      splits.push(man);
      const manTl = gsap.timeline({ scrollTrigger: { trigger: "#manifesto", start: "top top", end: "+=150%", pin: true, scrub: 0.6 } });
      manTl
        .to(man.words, { opacity: 1, stagger: 0.12, ease: "none" })
        .to(".notif-ghost", { x: "120vw", rotate: 12, opacity: 0, duration: 2, ease: "power2.in" }, 0.5)
        .to("[data-manifesto-pet]", { opacity: 1, y: -30, duration: 2 }, "-=3");

      /* ── Section headings: masked line reveals ────────────────── */
      $$("[data-split]").forEach((h) => {
        const s = new SplitText(h, { type: "lines", linesClass: "line-mask", mask: "lines" });
        splits.push(s);
        gsap.from(s.lines, { yPercent: 110, duration: 1.3, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 85%" } });
      });

      // generic staggered entrances
      ScrollTrigger.batch("[data-stagger]", {
        start: "top 88%",
        onEnter: (els) => gsap.from(els, { y: 60, opacity: 0, rotateX: -20, duration: 1.1, stagger: 0.08, ease: "expo.out", overwrite: true }),
      });

      /* ── Scene 4: showcase frame unmasks, flattens, then cycles ─ */
      const frame = $("[data-frame]");
      if (frame) {
        gsap.fromTo(frame,
          { clipPath: "inset(18% 22% 18% 22% round 40px)", rotateX: 28, scale: 0.86 },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", rotateX: 0, scale: 1, ease: "none",
            scrollTrigger: { trigger: frame, start: "top 95%", end: "top 25%", scrub: true } });
        const scr = $$(".frame .scr"), caps = $$("[data-caps] .chip");
        const cyc = gsap.timeline({ scrollTrigger: { trigger: ".frame-wrap", start: "top 12%", end: "+=160%", pin: true, scrub: 0.5,
          onUpdate: (st) => { const i = Math.min(2, Math.floor(st.progress * 3)); caps.forEach((c, k) => c.classList.toggle("on", k === i)); } } });
        scr.slice(1).forEach((s) => {
          cyc.fromTo(s, { opacity: 0, scale: 1.06, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }).to({}, { duration: 0.6 });
        });
      }

      /* ── Scene 5: day journey line draws, stops arrive ──────── */
      gsap.to("[data-jline]", { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-journey]", start: "top 70%", end: "bottom 60%", scrub: true } });
      $$("[data-stop]").forEach((s, i) => {
        gsap.from(s.querySelector(".card"), { x: i % 2 ? -80 : 80, opacity: 0, rotateY: i % 2 ? -18 : 18, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 78%" } });
        gsap.from(s.querySelector(".time"), { yPercent: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 80%" } });
        gsap.from(s.querySelector(".dot"), { scale: 0, duration: 0.6, ease: "back.out(3)", scrollTrigger: { trigger: s, start: "top 70%" } });
      });

      /* ── Scene 6: counters ─────────────────────────────────── */
      $$("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" }, onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
      });
      $$(".stat").forEach((s) => {
        const mv = (e: MouseEvent) => { const r = s.getBoundingClientRect(); s.style.setProperty("--x", `${e.clientX - r.left}px`); s.style.setProperty("--y", `${e.clientY - r.top}px`); };
        s.addEventListener("mousemove", mv);
        cleanups.push(() => s.removeEventListener("mousemove", mv));
      });

      /* ── Scene 8: hard-block visual unmasks ────────────────── */
      gsap.fromTo("[data-unmask]", { clipPath: "circle(8% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "none",
        scrollTrigger: { trigger: "[data-unmask]", start: "top 90%", end: "center 50%", scrub: true } });

      /* ── Scene 9: closing frame ────────────────────────────── */
      const fin = new SplitText("[data-final]", { type: "chars", charsClass: "char", mask: "chars" });
      splits.push(fin);
      gsap.from(fin.chars, { yPercent: 120, scaleY: 1.6, transformOrigin: "50% 100%", stagger: 0.04, duration: 1.4, ease: "expo.out",
        scrollTrigger: { trigger: "#cta", start: "top 60%" } });
      gsap.fromTo("[data-glow]", { scale: 0.5, opacity: 0 }, { scale: 1.1, opacity: 1, ease: "none", scrollTrigger: { trigger: "#cta", start: "top bottom", end: "center center", scrub: true } });

      /* ── Desktop-only: horizontal reel ─────────────────────── */
      mm.add("(min-width: 901px)", () => {
        const reel = $("[data-reel]");
        if (!reel) return;
        const dist = () => reel.scrollWidth - window.innerWidth;
        const h = gsap.to(reel, { x: () => -dist(), ease: "none",
          scrollTrigger: { trigger: reel, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1 } });
        $$("[data-panel]").forEach((p) => {
          p.querySelectorAll<HTMLElement>("[data-par]").forEach((el) => {
            const d = Number(el.dataset.par);
            gsap.fromTo(el, { x: d * 12 }, { x: -d * 12, ease: "none", scrollTrigger: { trigger: p, containerAnimation: h, start: "left right", end: "right left", scrub: true } });
          });
          gsap.from(p.querySelectorAll("h3, p, .chip"), { y: 50, opacity: 0, stagger: 0.05, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: p, containerAnimation: h, start: "left 70%" } });
          gsap.fromTo(p.querySelector(".num"), { xPercent: 60 }, { xPercent: -60, ease: "none", scrollTrigger: { trigger: p, containerAnimation: h, start: "left right", end: "right left", scrub: true } });
        });
      });
      mm.add("(max-width: 900px)", () => {
        $$("[data-panel]").forEach((p) => gsap.from(p.children, { y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 80%" } }));
      });

      /* ── Cursor: follower, magnetic buttons, parallax, tilt ─── */
      if (fine) {
        const cur = $(".cursor")!, dot = $(".cursor-dot")!;
        const cx = gsap.quickTo(cur, "x", { duration: 0.45, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: 0.45, ease: "power3" });
        const dx = gsap.quickTo(dot, "x", { duration: 0.08 }), dy = gsap.quickTo(dot, "y", { duration: 0.08 });
        const floats = $$("[data-depth]").map((el) => ({ d: Number(el.dataset.depth), x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }), y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }), el }));
        const move = (e: MouseEvent) => {
          cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY);
          const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
          if (window.scrollY < window.innerHeight) floats.forEach((f) => { f.x(nx * f.d * 2.2); if (!f.el.classList.contains("float")) f.y(ny * f.d * 2.2); });
        };
        window.addEventListener("mousemove", move);
        cleanups.push(() => window.removeEventListener("mousemove", move));

        $$("a, button, summary, [data-tilt]").forEach((el) => {
          const enter = () => { cur.classList.add("big"); cur.textContent = el.dataset.cursor ?? ""; };
          const leave = () => { cur.classList.remove("big"); cur.textContent = ""; };
          el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave);
          cleanups.push(() => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
        });

        $$("[data-magnetic]").forEach((el) => {
          const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" }), my = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });
          const lbl = el.querySelector<HTMLElement>(".lbl");
          const m = (e: MouseEvent) => {
            const r = el.getBoundingClientRect(); const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
            mx(x * 0.35); my(y * 0.45); if (lbl) gsap.to(lbl, { x: x * 0.15, y: y * 0.2, duration: 0.4 });
          };
          const l = () => { mx(0); my(0); if (lbl) gsap.to(lbl, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" }); };
          el.addEventListener("mousemove", m); el.addEventListener("mouseleave", l);
          cleanups.push(() => { el.removeEventListener("mousemove", m); el.removeEventListener("mouseleave", l); });
        });

        $$("[data-tilt]").forEach((el) => {
          const rx = gsap.quickTo(el, "rotateX", { duration: 0.5 }), ry = gsap.quickTo(el, "rotateY", { duration: 0.5 });
          gsap.set(el, { transformPerspective: 900 });
          const m = (e: MouseEvent) => { const r = el.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 22); rx(-((e.clientY - r.top) / r.height - 0.5) * 22); };
          const l = () => { rx(0); ry(0); };
          el.addEventListener("mousemove", m); el.addEventListener("mouseleave", l);
          cleanups.push(() => { el.removeEventListener("mousemove", m); el.removeEventListener("mouseleave", l); });
        });
      }
    });

    // Pins were created out of page order (the reel's lives in matchMedia): sort by position, then re-measure.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    // Fonts change line breaks: re-measure once they're in.
    document.fonts?.ready.then(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });

    return () => {
      window.removeEventListener("pawse:mood", onMood);
      cleanups.forEach((c) => c());
      ctx.revert();
      mm.revert();
      splits.forEach((s) => s.revert());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
