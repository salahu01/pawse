"use client";
/* eslint-disable @next/next/no-img-element -- static export: plain <img> with basePath-aware src */
import { useEffect, useRef, useState } from "react";
import { asset, pets } from "@/lib/site";

const asks = ["Hey hey! Did you drink water? 💧", "Momo brought you water! 🥤✨", "Sip break together? 💙"];
const pleads = ["Pretty please? Just one sip? 🥺", "I'm getting worried… one sip? 😿", "I will sit here until you drink. 😤💧"];

/** Hero speech bubble you can answer; drives Momo's mood via a DOM event the motion layer listens to. */
export function HeroBubble() {
  const [mood, setMood] = useState<"asking" | "happy" | "sad">("asking");
  const [say, setSay] = useState(asks[0]);
  const [glasses, setGlasses] = useState(2);
  const [declines, setDeclines] = useState(0);
  const [hearts, setHearts] = useState<number[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("pawse:mood", { detail: mood }));
  }, [mood]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const later = (d: number) => {
    timer.current = setTimeout(() => {
      setMood("asking");
      setSay(d ? pleads[Math.min(d - 1, 2)] : asks[Math.floor(Math.random() * asks.length)]);
    }, 2600);
  };
  const yes = () => {
    const g = Math.min(8, glasses + 1);
    setGlasses(g); setDeclines(0); setMood("happy");
    setSay(g >= 8 ? "GOAL! 8/8 🎉 so proud!" : `Yaaay! ${g}/8 glasses 💙`);
    setHearts(Array.from({ length: 8 }, (_, i) => Date.now() + i));
    later(0);
  };
  const no = () => {
    const d = declines + 1;
    setDeclines(d); setMood("sad"); setSay("Awww… okayyy. I'll come back soon 🥺");
    later(d);
  };

  return (
    <div className="stage">
      <div className="hearts" aria-hidden="true">
        {hearts.map((h, i) => (
          <span key={h} style={{ left: `${15 + ((i * 37) % 70)}%`, top: `${30 + ((i * 17) % 30)}%`, animationDelay: `${i * 0.07}s` }}>
            {i % 2 ? "💧" : "💖"}
          </span>
        ))}
      </div>
      <div className="bubble glass" data-reveal-hero>
        <div className="who"><img src={asset("/media/pets/kid-asking.png")} alt="" />Momo · just now</div>
        <p aria-live="polite">{say}</p>
        <div className="btns" style={{ visibility: mood === "asking" ? "visible" : "hidden" }}>
          <button className="btn sm" data-magnetic onClick={yes}><span className="lbl">Yes! 💧</span></button>
          <button className="btn sm ghost" data-magnetic onClick={no}><span className="lbl">Not yet</span></button>
        </div>
        <div className="meter" aria-label={`${glasses} of 8 glasses`}>
          <span>💧</span><span className="g"><i style={{ width: `${(glasses / 8) * 100}%` }} /></span><span>{glasses}/8</span>
        </div>
      </div>
    </div>
  );
}

/** Pet cards with mood toggles; tilt is handled by the motion layer via [data-tilt]. */
export function PetGrid() {
  const [moods, setMoods] = useState<Record<string, string>>({});
  return (
    <div className="pets">
      {pets.map((p) => {
        const m = moods[p.id] ?? "asking";
        return (
          <article className="petc glass" data-tilt data-stagger key={p.id}>
            <img src={asset(`/media/pets/${p.id}-${m}.png`)} alt={`${p.name}, a Pawse pet, looking ${m === "asking" ? "curious" : m}`} loading="lazy" width={150} height={150} />
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="moods" role="group" aria-label={`${p.name}'s mood`}>
              {[["asking", "🤔", "curious"], ["happy", "😊", "happy"], ["sad", "🥺", "sad"]].map(([k, e, label]) => (
                <button key={k} className={m === k ? "on" : ""} aria-label={label} aria-pressed={m === k}
                  onClick={() => setMoods((s) => ({ ...s, [p.id]: k }))}>{e}</button>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** "Try the hard block" full-screen demo. */
export function HardBlockDemo() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    btn.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open]);
  const confirm = () => { setDone(true); setTimeout(() => setOpen(false), 1500); };
  return (
    <>
      <button className="btn" data-magnetic onClick={() => { setDone(false); setOpen(true); }}>
        <span className="lbl">Try the hard block 🔒</span>
      </button>
      {open && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Hard block demo">
          <div>
            <img src={asset(`/media/pets/cat-${done ? "happy" : "asking"}.png`)} alt="Mochi the cat" />
            <h3>{done ? "Yay! Thank you 💖" : "Did you stretch? 🧘"}</h3>
            <p className="sub">{done ? "Unlocking…" : "Your screen unlocks when you say yes"}</p>
            {!done && <button ref={btn} className="btn" onClick={confirm}><span className="lbl">Done! 🧘</span></button>}
          </div>
          <div className="esc">Demo only. Press Esc to close.</div>
        </div>
      )}
    </>
  );
}
