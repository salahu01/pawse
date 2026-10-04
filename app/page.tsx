/* eslint-disable @next/next/no-img-element -- static export: plain <img> with basePath-aware src */
import { HardBlockDemo, HeroBubble, PetGrid } from "@/components/Interactive";
import Showreel from "@/components/Showreel";
import { DOWNLOAD, REPO, VERSION, asset, faqs, site } from "@/lib/site";

const marquee = ["drink water", "stretch", "rest your eyes", "take a break", "fix posture", "go for a walk", "breathe", "take a pawse"];

const panels = [
  {
    n: "01", tag: "Water", title: <>Sip, <em>sip</em>,<br />hooray.</>,
    body: "Set a daily goal and glass size. Your pet visits on your schedule, only during your active hours, and stops once you hit your goal.",
    chips: ["Daily goal", "Streaks", "Month calendar", "One-click log"],
    shot: "/media/screen-water.jpg", alt: "Pawse water tracker with a 75% full glass and streaks", pet: "penguin-happy",
    cards: [{ big: "6/8", small: "glasses today", pos: { left: "0%", top: "14%" } }, { big: "🔥 11", small: "day streak", pos: { right: "2%", bottom: "8%" } }],
  },
  {
    n: "02", tag: "Habits", title: <>Any habit.<br /><em>Any</em> interval.</>,
    body: "Stretch every 30 minutes. Walk every 45. Rest your eyes every 20. Create any habit with an emoji and a goal, and your pet asks about it.",
    chips: ["🧘 Stretch · 30m", "🚶 Walk · 45m", "👀 Eyes · 20m", "✨ Anything"],
    shot: "/media/screen-habits.jpg", alt: "Pawse habits page with streaks and a monthly calendar", pet: "cat-happy",
    cards: [{ big: "🧘 3/4", small: "stretches", pos: { left: "-2%", bottom: "18%" } }, { big: "every 30m", small: "pet reminder", pos: { right: "0%", top: "10%" } }],
  },
  {
    n: "03", tag: "Screen time", title: <>Breaks you&apos;ll<br /><em>actually</em> take.</>,
    body: "Pawse measures active use and pauses when you step away. After 30 minutes of continuous screen time, a calm full-screen break with tips like the 20-20-20 rule.",
    chips: ["Hourly chart", "Auto-pause", "Daily limit", "20-20-20 tips"],
    shot: "/media/screen-break.jpg", alt: "Pawse full-screen break countdown with an eye-rest tip", pet: "capybara-happy",
    cards: [{ big: "4h 28m", small: "screen time today", pos: { left: "0%", top: "8%" } }, { big: "☕ 4", small: "breaks taken", pos: { right: "4%", bottom: "12%" } }],
  },
  {
    n: "04", tag: "Hard block", title: <>No snooze.<br /><em>No</em> excuses.</>,
    body: "For the habits you're serious about: the pet covers the whole screen until you say yes. For water, any habit, or breaks. Emergency exit: hold Esc for 5 seconds.",
    chips: ["Per habit", "Locked breaks", "Esc × 5s escape"],
    shot: "/media/screen-block.jpg", alt: "Pawse hard block screen asking 'Did you stretch?'", pet: "bunny-asking",
    cards: [{ big: "🔒", small: "screen locked", pos: { left: "2%", bottom: "12%" } }, { big: "Done! 🧘", small: "the only way out", pos: { right: "0%", top: "14%" } }],
  },
];

const day = [
  { t: "9:00", pet: "kid-asking", h: "Good morning, water?", p: "Momo walks in with a bottle before your first meeting." },
  { t: "10:30", pet: "cat-asking", h: "Did you stretch?", p: "Your 30-minute stretch habit. Mochi waits for an answer." },
  { t: "12:00", pet: "capybara-happy", h: "Break time ☕", p: "30 minutes of screen time. A calm countdown, eyes off the screen." },
  { t: "15:00", pet: "bunny-sad", h: "Not yet?", p: "Boo droops, sniffles, and floats back a little later." },
  { t: "18:00", pet: "penguin-happy", h: "Goal reached 🎉", p: "8/8 glasses, 4 stretches. Your streak grows to 12 days." },
];

const stats = [
  { n: 5, suf: "", p: "hand-built 3D pets with voices and moods" },
  { n: 0, suf: "", p: "network requests. Your data never leaves your Mac" },
  { n: 0, pre: "$", suf: "", p: "forever. Free and open source under MIT" },
  { n: 5, suf: "MB", p: "universal download for Apple silicon and Intel" },
  { n: 13, suf: "+", p: "macOS Ventura and every version since" },
  { n: 30, suf: "m", p: "default break rhythm, adjustable to anything" },
];

export default function Home() {
  return (
    <>
      <Showreel />
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />

      <nav aria-label="Main">
        <div className="wrap">
          <a className="brand" href="#hero" data-magnetic><img src={asset("/pawse-icon.png")} alt="" width={38} height={38} />Pawse</a>
          <div className="bar">
            <a href="#reel">Features</a>
            <a href="#day">A day</a>
            <a href="#pets">Pets</a>
            <a href="#faq">FAQ</a>
            <a href={REPO}>GitHub</a>
            <a className="btn sm" href={DOWNLOAD} data-magnetic><span className="lbl">Download</span></a>
          </div>
        </div>
      </nav>

      <main id="main">
        {/* ── Scene 1: opening frame ─────────────────────────── */}
        <section id="hero">
          <div className="blob b1" data-depth="-30" />
          <div className="blob b2" data-depth="40" />
          <div className="blob b3" data-depth="-20" />
          <div className="float f-cat" data-depth="26"><img src={asset("/media/pets/cat-asking.png")} alt="" /></div>
          <div className="float f-pen" data-depth="-34"><img src={asset("/media/pets/penguin-asking.png")} alt="" /></div>
          <div className="float f-cap" data-depth="18"><img src={asset("/media/pets/capybara-asking.png")} alt="" /></div>
          <div className="float f-bun" data-depth="-22"><img src={asset("/media/pets/bunny-asking.png")} alt="" /></div>
          <div className="float f-kid" data-depth="40"><img id="heroKid" src={asset("/media/pets/kid-asking.png")} alt="Momo, the Pawse chibi pet" /></div>

          <div className="wrap">
            <div className="hero-top">
              <h1>
                <span className="eyebrow" data-hero-in>Cute water, habit &amp; break reminder for Mac</span>
                <span className="mega" data-mega>Take a <em>pawse.</em></span>
              </h1>
            </div>
            <div className="hero-sub">
              <div data-hero-in>
                <p>
                  A tiny 3D friend walks onto your screen and asks: <b>did you drink water?</b> Did you stretch? Time for a break?
                  Say yes and it bounces with joy. Say &quot;not yet&quot; and… well, look at that face.
                </p>
                <div className="cta-row">
                  <a className="btn" href={DOWNLOAD} data-magnetic data-cursor="Get it"><span className="lbl">⬇ Download for Mac</span></a>
                  <a className="btn ghost" href={REPO} data-magnetic><span className="lbl">★ Star on GitHub</span></a>
                </div>
                <p className="meta">Free · open source · {site.requirements} · v{VERSION}</p>
              </div>
              <HeroBubble />
            </div>
          </div>
          <div className="marquee" aria-hidden="true">
            <div className="track">
              {[0, 1].map((k) => marquee.map((m, i) => <span key={`${k}${i}`} className={i % 2 ? "o" : ""}>{m}</span>))}
            </div>
          </div>
        </section>

        {/* ── Scene 2: manifesto ─────────────────────────────── */}
        <section id="manifesto" aria-label="Why a pet">
          <div className="notif-ghost glass" aria-hidden="true"><span style={{ fontSize: 26 }}>🔔</span><div><b>Reminder</b>Time to drink water.</div></div>
          <div className="wrap">
            <span className="eyebrow">Why a pet?</span>
            <p className="manifesto-text" data-manifesto style={{ marginTop: 26 }}>
              Notifications get swiped away. Banners get muted. Reminders get ignored. But it&apos;s really hard to say no to someone
              <em> small and hopeful</em> who walked all the way across your screen just to ask if you&apos;re okay.
            </p>
          </div>
          <img className="manifesto-pet" data-manifesto-pet src={asset("/media/pets/cat-sad.png")} alt="Mochi the cat looking hopeful" />
        </section>

        {/* ── Scene 3: horizontal feature reel ───────────────── */}
        <section id="reel" aria-labelledby="reel-h">
          <div className="wrap reel-head">
            <span className="eyebrow">Everything in one place</span>
            <h2 id="reel-h" data-split style={{ marginTop: 18 }}>Water, habits &amp; <em>screen time.</em></h2>
          </div>
          <div className="reel-track" data-reel>
            {panels.map((p) => (
              <article className="panel" key={p.n} data-panel>
                <span className="num" aria-hidden="true">{p.n}</span>
                <div>
                  <span className="eyebrow">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <ul>{p.chips.map((c) => <li className="chip" key={c}>{c}</li>)}</ul>
                </div>
                <div className="comp">
                  <div className="shot" data-par="-6"><img src={asset(p.shot)} alt={p.alt} loading="lazy" /></div>
                  {p.cards.map((c) => (
                    <div className="fc glass" key={c.small} style={c.pos} data-par="14">
                      <div className="big">{c.big}</div><small>{c.small}</small>
                    </div>
                  ))}
                  <img className="pet" src={asset(`/media/pets/${p.pet}.png`)} alt="" style={{ left: "38%", bottom: "-4%" }} data-par="24" loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Scene 4: product showcase ──────────────────────── */}
        <section id="showcase" aria-labelledby="show-h">
          <div className="wrap">
            <span className="eyebrow">The app</span>
            <h2 id="show-h" data-split style={{ marginTop: 18 }}>One window.<br /><em>Your whole day.</em></h2>
            <div className="frame-wrap">
              <div className="frame" data-frame>
                <img className="scr" src={asset("/media/screen-today.jpg")} alt="Pawse Today dashboard with water, screen time and habits" />
                <img className="scr" src={asset("/media/screen-habits.jpg")} alt="Pawse habit detail with streak and calendar" />
                <img className="scr" src={asset("/media/screen-screen.jpg")} alt="Pawse screen time with hourly and weekly charts" />
              </div>
              <div className="caps" data-caps>
                <span className="chip on">☀️ Today</span><span className="chip">✅ Habits</span><span className="chip">🖥️ Screen time</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Scene 5: a day with Pawse ──────────────────────── */}
        <section id="day" className="sec" aria-labelledby="day-h">
          <div className="wrap">
            <span className="eyebrow">How it works</span>
            <h2 id="day-h" data-split style={{ marginTop: 18 }}>A day with <em>Pawse.</em></h2>
            <div className="journey" data-journey>
              <div className="jline"><i data-jline /></div>
              {day.map((d) => (
                <div className="stop" key={d.t} data-stop>
                  <span className="dot" />
                  <div className="time">{d.t}</div>
                  <div className="card glass">
                    <img src={asset(`/media/pets/${d.pet}.png`)} alt="" loading="lazy" />
                    <div><h3>{d.h}</h3><p>{d.p}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Scene 6: proof ─────────────────────────────────── */}
        <section id="proof" className="sec" aria-labelledby="proof-h" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="eyebrow">By the numbers</span>
            <h2 id="proof-h" data-split style={{ marginTop: 18 }}>Small app.<br /><em>Big care.</em></h2>
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.p} data-stagger>
                  <div className="n">{s.pre ?? ""}<span data-count={s.n}>{s.n}</span>{s.suf && <sup>{s.suf}</sup>}</div>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Scene 7: pets ──────────────────────────────────── */}
        <section id="pets" className="sec" aria-labelledby="pets-h" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="eyebrow">Meet the gang</span>
            <h2 id="pets-h" data-split style={{ marginTop: 18 }}>Pick your <em>buddy.</em></h2>
            <p className="lead" style={{ marginTop: 18 }}>Five hand-built 3D desktop pets, each with its own walk, voice and personality. Tap the moods. Or drop in any <code>.usdz</code> model.</p>
            <PetGrid />
          </div>
        </section>

        {/* ── Scene 8: hard block ────────────────────────────── */}
        <section id="block" className="sec" aria-labelledby="block-h" style={{ paddingTop: 0 }}>
          <div className="wrap grid2">
            <div>
              <span className="eyebrow">🔒 Hard block</span>
              <h2 id="block-h" data-split style={{ marginTop: 18 }}>Serious <em>mode.</em></h2>
              <p className="lead" style={{ margin: "20px 0 30px" }}>
                Your pet covers the whole screen, and it only unlocks when you say yes. No snoozing, no ending breaks early.
                There&apos;s always an emergency exit: hold Esc for 5 seconds.
              </p>
              <HardBlockDemo />
            </div>
            <div className="lockvis" data-unmask><img src={asset("/media/screen-block.jpg")} alt="Pawse hard block screen with a Done button" loading="lazy" /></div>
          </div>
        </section>

        {/* ── FAQ (also feeds FAQPage JSON-LD) ───────────────── */}
        <section id="faq" className="sec" aria-labelledby="faq-h" style={{ paddingTop: 0 }}>
          <div className="wrap faq-grid">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 id="faq-h" data-split style={{ marginTop: 18 }}>Questions, <em>answered.</em></h2>
            </div>
            <div className="faq">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary><h3>{f.q}</h3></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Scene 9: closing frame ─────────────────────────── */}
        <section id="cta" aria-labelledby="cta-h">
          <div className="glow" data-glow />
          <img className="icon" src={asset("/pawse-icon.png")} alt="Pawse app icon" width={120} height={120} data-stagger />
          <h2 id="cta-h" className="final" data-final>Take a <em>pawse.</em></h2>
          <p className="lead">Free forever. Lives quietly in your menu bar until it&apos;s time to care.</p>
          <a className="btn" href={DOWNLOAD} data-magnetic data-cursor="Get it" style={{ fontSize: 19, padding: "20px 38px" }}>
            <span className="lbl">⬇ Download Pawse for Mac</span>
          </a>
          <p className="note">
            First launch: if macOS can&apos;t verify the developer, right-click Pawse in Applications → <b>Open</b> → <b>Open</b>. Requires {site.requirements}.
          </p>
          <div className="parade" aria-hidden="true">
            {["kid-happy", "cat-asking", "penguin-happy", "capybara-asking", "bunny-happy"].map((p, i) => (
              <div className="walker" key={p} style={{ animationDelay: `${-i * 4.6}s` }}><img src={asset(`/media/pets/${p}.png`)} alt="" /></div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© 2026 {site.author.name} · MIT licensed · Sounds: <a style={{ margin: 0 }} href={`${REPO}/blob/main/CREDITS.md`}>credits</a></span>
          <span><a href={REPO}>Source</a><a href={`${REPO}/releases`}>Releases</a><a href={`${REPO}/issues`}>Feedback</a></span>
        </div>
      </footer>
    </>
  );
}
