"""Score for the POV demo: soft lofi bed + UI foley + Momo's real voice lines. Writes out/demo.wav."""
import os, numpy as np, wave
here = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(here, "audio.py")).read()
exec(src.split("# --- arrangement")[0].replace("DUR, BPM = 44100, 32.0, 120", "DUR, BPM = 44100, 60.5, 84"))

def click_sfx():
    t = t_(.04); return (np.sin(2 * np.pi * 2400 * t) * .5 + rng.standard_normal(len(t)) * .4) * np.exp(-t * 180) * .6
def key():
    t = t_(.05); n = rng.standard_normal(len(t)); return (n - np.convolve(n, np.ones(5) / 5, "same")) * np.exp(-t * 110) * .5
def step(f=230):
    t = t_(.09); return np.sin(2 * np.pi * f * t * (1 + np.exp(-t * 50))) * np.exp(-t * 45) * .35
def thud():
    t = t_(.8); return np.sin(2 * np.pi * np.cumsum(60 + 80 * np.exp(-t * 20)) / SR) * np.exp(-t * 6) * .9
def buzz():
    t = t_(.25); return np.sign(np.sin(2 * np.pi * 120 * t)) * np.exp(-t * 10) * .18

# lofi bed (Fmaj7 Em7 Dm7 Cmaj7), muted while overlays/voice need space via ducking
chords = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]]
bar = 4 * B
for i in range(int(60 / bar) + 1):
    t0 = i * bar; c = chords[i % 4]
    add(music, pad(c, bar + .4), t0, .5)
    add(music, bass(c[0] - 12, bar), t0, .7)
    for s in range(8):
        ts = t0 + s * B / 2
        if s % 2 == 0: add(music, pluck(c[(s // 2) % 4] + 12, .5), ts + (0.02 if s % 4 else 0), .45, .3 * np.sin(s))
        if s in (0, 5): add(music, kick(.55), ts, 1)
        if s in (2, 6): add(music, snare() * .6, ts, 1)
        add(music, hat(), ts + .03 * (s % 2), .35, -.2)

# typing
for i in range(11): add(sfx, key(), .6 + i * .22 + (.5 if i > 5 else 0), .5, .2)
# walks: (start, dur)
for a, d in [(3.6, 2.4), (11.1, 1.6), (15.0, 1.9), (21.6, 1.4), (35.5, 1.6)]:
    for k in range(int(d / .32)): add(sfx, step(220 + 30 * (k % 2)), a + k * .32 + .16, .55, .5)
# bubbles
for at in [6.1, 8.4, 16.95, 19.4, 37.15, 39.2]: add(sfx, pop(1100, 450, .1), at, .35, .5)
# clicks
for at in [8.1, 19.0, 27.75, 28.4, 31.5, 39.0, 48.9, 49.9, 52.6]: add(sfx, click_sfx(), at, .7)
# happy sparkles
for at, n in [(19.2, 6), (31.6, 9), (43.75, 7)]:
    for k in range(n): add(sfx, plink(1300 + rng.integers(0, 1500)), at + k * .05, .18, rng.uniform(-.7, .7))
# time-lapses: whoosh + fast clock ticks
for at, d in [(12.8, 2.2), (23.0, 2.0), (33.5, 2.0), (45.6, 2.0)]:
    add(sfx, whoosh(.6), at - .15, .55); add(sfx, riser(d - .4) * .6, at + .1, .5)
    for k in range(int((d - .6) / .06)): add(sfx, tick(), at + .2 + k * .06, .18)
# hard block
add(sfx, thud(), 25.0, .7); add(sfx, buzz(), 28.25, .8); add(sfx, buzz(), 29.15, .8)
add(sfx, bell(84, 1.2), 31.55, .5); add(sfx, bell(88, 1.2), 31.65, .4)
# break
add(sfx, bell(77, 2.0), 39.6, .5)
for k in range(int(3.6 / .1)): add(sfx, tick(), 40.0 + k * .1, .12)
add(sfx, bell(81, 1.5), 43.7, .55); add(sfx, bell(84, 1.5), 43.85, .45)
# app window + end card
add(sfx, whoosh(.4), 49.95, .4)
add(sfx, bell(77, 3.0), 55.4, .55); add(sfx, bell(81, 3.0), 55.5, .45); add(sfx, bell(84, 3.0), 55.6, .45)
for i in range(5): add(sfx, pop(800 + i * 140, 300), 56.4 + i * .1, .35, (i - 2) * .35)

def load(name):
    import subprocess
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(SND, name + ".wav"), "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
for name, at in [("kid_ask_0", 6.1), ("kid_sad", 8.4), ("kid_plead", 16.95), ("kid_happy", 19.3), ("kid_habit", 25.5),
                 ("kid_break", 37.15), ("kid_breakstart", 39.2), ("kid_breakdone", 43.7), ("kid_goal", 50.2)]:
    add(voice, load(name), at, 1.0, .25)

venv = np.convolve(np.abs(voice[:, 0]), np.ones(2205) / 2205, "same")
duck = 1 - np.clip(venv * 7, 0, .6)
mix = music * .42 * duck[:, None] + sfx * .75 + voice * 1.15
mix[: int(.4 * SR)] *= np.linspace(0, 1, int(.4 * SR))[:, None]
mix[-int(1.5 * SR):] *= np.linspace(1, 0, int(1.5 * SR))[:, None] ** 1.5
mix = np.tanh(mix * 1.1); mix *= .89 / np.abs(mix).max()
with wave.open(os.path.join(here, "out", "demo.wav"), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("demo.wav written")
