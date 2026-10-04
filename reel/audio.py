"""Synthesised score for the Pawse reel: 120 BPM so every scene cut lands on a beat.
Writes out/score.wav (44.1 kHz stereo). Voice clips come from the app's own Sounds."""
import numpy as np, wave, subprocess, os

SR, DUR, BPM = 44100, 32.0, 120
B = 60 / BPM
N = int(SR * DUR)
here = os.path.dirname(os.path.abspath(__file__))
SND = os.path.expanduser("~/Projects/pawse-app/Resources/Sounds")
rng = np.random.default_rng(3)

music = np.zeros((N, 2)); sfx = np.zeros((N, 2)); voice = np.zeros((N, 2))
t_ = lambda d: np.arange(int(SR * d)) / SR

def add(buf, x, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N: return
    x = x[: N - i]
    l, r = np.sqrt(0.5 * (1 - pan)), np.sqrt(0.5 * (1 + pan))
    buf[i:i + len(x), 0] += x * gain * l * 1.414
    buf[i:i + len(x), 1] += x * gain * r * 1.414

def env(n, a=0.005, d=0.3):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1) * np.exp(-t / d)

def hz(m): return 440 * 2 ** ((m - 69) / 12)

# --- instruments ---
def kick(g=1):
    t = t_(0.45); f = 48 + 110 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7) * g + rng.standard_normal(len(t)) * np.exp(-t * 300) * .15

def snare():
    t = t_(0.3)
    n = rng.standard_normal(len(t)); n = n - np.convolve(n, np.ones(6) / 6, "same")
    return n * np.exp(-t * 16) * .5 + np.sin(2 * np.pi * 190 * t) * np.exp(-t * 25) * .4

def clap():
    t = t_(0.35); n = rng.standard_normal(len(t)); n = n - np.convolve(n, np.ones(4) / 4, "same")
    e = sum(np.exp(-np.maximum(t - k * .011, 0) * 60) * (t >= k * .011) for k in range(3)) * .5 + np.exp(-t * 9) * .4
    return n * e * .55

def hat(open_=False):
    t = t_(0.25 if open_ else 0.06); n = rng.standard_normal(len(t))
    n = n - np.convolve(n, np.ones(3) / 3, "same")
    return n * np.exp(-t * (14 if open_ else 70)) * .22

def pluck(m, d=0.35):
    t = t_(d + .2); f = hz(m)
    x = sum(np.sin(2 * np.pi * f * k * t) / k ** 1.6 for k in range(1, 7))
    return x * env(len(t), .003, d * .45) * .22

def bell(m, d=1.2):
    t = t_(d); f = hz(m)
    return (np.sin(2 * np.pi * f * t + 1.8 * np.sin(2 * np.pi * f * 3.5 * t) * np.exp(-t * 4)) * env(len(t), .002, d * .35)) * .25

def pad(ms, d):
    t = t_(d); x = np.zeros(len(t))
    for m in ms:
        for det in (-0.08, 0.08):
            f = hz(m + det); x += (2 * ((f * t) % 1) - 1) * .06
    x = np.convolve(x, np.ones(40) / 40, "same")
    a = np.minimum(t / .4, 1) * np.minimum((d - t) / .5, 1)
    return x * np.clip(a, 0, 1)

def bass(m, d):
    t = t_(d); f = hz(m)
    x = np.sin(2 * np.pi * f * t) + .35 * np.sin(4 * np.pi * f * t)
    return x * np.minimum(t / .01, 1) * np.exp(-t * 2.5) * .45

def whoosh(d=0.6, up=True):
    t = t_(d); n = rng.standard_normal(len(t))
    lo = np.linspace(.02, .5, len(t)) if up else np.linspace(.5, .02, len(t))
    y = np.zeros(len(t)); s = 0.0
    for i in range(len(t)): s += lo[i] * (n[i] - s); y[i] = s
    return y * np.sin(np.pi * t / d) ** 2 * 1.6

def riser(d=1.0):
    t = t_(d); f = 200 + 1800 * (t / d) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .15 + rng.standard_normal(len(t)) * .08) * (t / d) ** 2

def pop(f0=900, f1=300, d=0.12):
    t = t_(d); f = f1 + (f0 - f1) * np.exp(-t * 40)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 30) * .5

def plink(f=1800):
    t = t_(0.5); fr = f * (1 + .6 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 9) * .5

def impact():
    t = t_(1.2)
    return kick(1.3)[: len(t)] if False else np.concatenate([kick(1.2), np.zeros(len(t) - len(kick()))]) + rng.standard_normal(len(t)) * np.exp(-t * 5) * .25

def tick():
    t = t_(0.03); return np.sin(2 * np.pi * 3200 * t) * np.exp(-t * 200) * .35

# --- arrangement (F major: I V vi IV per 2s bar) ---
chords = [[53, 57, 60, 64], [48, 52, 55, 59], [50, 53, 57, 60], [46, 50, 53, 57]]
roots = [41, 36, 38, 34]

# S1 ambient: pad swell + drop plink + riser into the drop at 3s
add(music, pad([65, 69, 72], 3.0), 0, .8)
add(sfx, plink(2100), .92, .7); add(sfx, plink(1500), 1.02, .35, .4)
add(sfx, whoosh(.7), 1.15, .6)
add(sfx, bell(77, 1.5), 1.85, .9); add(sfx, bell(84, 1.5), 1.95, .5, .3)
add(sfx, riser(.9), 2.1, .8)

def bar_music(b0, b1, drums=True, snares=True, arp=True):
    for bar in range(b0, b1):
        t0 = bar * 4 * B; c = chords[bar % 4]
        add(music, pad(c, 4 * B + .4), t0, .7)
        add(music, bass(roots[bar % 4], 4 * B), t0, 1)
        for s in range(16):
            ts = t0 + s * B / 4
            if arp: add(music, pluck(c[[0, 1, 2, 3, 2, 1, 3, 2][s % 8]] + 12 + (12 if s in (6, 14) else 0)), ts, .8, .35 * np.sin(s))
            if drums:
                if s % 4 == 0: add(music, kick(), ts, 1)
                if s % 4 == 2: add(music, hat(s == 14), ts, 1, .3)
                if snares and s in (4, 12): add(music, clap(), ts, 1)
                if s % 2 == 1: add(music, hat(), ts, .45, -.3)

bar_music(1, 2, drums=True, snares=False, arp=False)   # 3–5s: kicks + bass under the word slams
bar_music(2, 3, drums=True, snares=False)              # 5–7s
bar_music(3, 10)                                       # 7–20s full groove
# 20–22.5 breakdown: just pad + heartbeat
add(music, pad([50, 53, 57], 2.6), 20.0, .8)
for k in range(4): add(music, kick(.7), 20.5 + k * .5, 1)
add(sfx, riser(.9), 21.6, .9)
bar_music(11, 14)                                       # 22–28 groove back (drop on the click)
add(music, pad(chords[0], 4.5) * 1.0, 28.0, 1); add(music, bass(41, 4.0), 28.0, 1)
for s in range(8): add(music, pluck(chords[0][s % 4] + 24, .5), 28.0 + s * B / 2, .6, .4 * np.sin(s))
add(music, bell(77, 3.5), 28.0, .8); add(music, bell(81, 3.5), 28.05, .5, -.3); add(music, bell(84, 3.5), 28.1, .5, .3)
add(music, kick(1.1), 28.0, 1)

# word slams
for i, at in enumerate([3.0, 3.5, 4.0, 4.5]): add(sfx, impact(), at, .55); add(sfx, whoosh(.25), at - .2, .35, (-1) ** i * .5)
add(sfx, pop(1200, 500), 5.35, .5)
add(sfx, whoosh(.5), 6.45, .7)
# pets
for i in range(5): add(sfx, pop(700 + i * 120, 250), 7.75 + i * .18, .45, (i - 2) * .3)
for i in range(5): add(sfx, plink(1400 + i * 180), 9.0 + i * .12, .35, (i - 2) * .3)
add(sfx, whoosh(.6), 10.4, .8)
# sitting counter ticks
for k in range(40): add(sfx, tick(), 11.3 + k * .05, .25 + .5 * (k / 40))
add(sfx, impact(), 13.4, .4)
add(sfx, whoosh(.6), 14.4, .8)
# feature cards
for i in range(4):
    add(sfx, whoosh(.45, False), 15.0 + i * 1.25, .55, .5)
    add(sfx, pop(500, 200, .1), 15.15 + i * 1.25, .3)
add(sfx, whoosh(.5), 19.5, .8)
# hard block
add(sfx, impact(), 20.0, .9); add(sfx, impact(), 20.55, .4)
add(sfx, pop(1000, 400), 21.6, .4)
add(sfx, tick() * 3, 22.45, .9)
add(sfx, impact(), 22.5, .8)
for k in range(10): add(sfx, plink(1200 + rng.integers(0, 1600)), 22.5 + k * .04, .2, rng.uniform(-.8, .8))
add(sfx, whoosh(.6), 23.4, .8)
# stats
for i in range(4): add(sfx, pop(600 + i * 150, 220), 24.35 + i * .2, .4, (-1) ** i * .4)
for k in range(20): add(sfx, tick(), 24.5 + k * .06, .15)
add(sfx, whoosh(.5), 27.4, .8)
# end
add(sfx, impact(), 28.0, .6)
for i in range(5): add(sfx, pop(800 + i * 140, 300), 29.4 + i * .1, .4, (i - 2) * .35)

# voice (Momo + Mochi) from the app
def load(name):
    p = os.path.join(SND, name + ".wav")
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
for name, at, g in [("kid_ask_0", 5.3, 1.0), ("kid_happy", 9.05, .9), ("kid_sad", 13.45, .85), ("cat_ask", 21.35, .9), ("cat_happy", 22.55, .9), ("kid_goal", 29.45, 1.0)]:
    add(voice, load(name), at, g)

# sidechain-ish duck under the voice
venv = np.convolve(np.abs(voice[:, 0]), np.ones(2205) / 2205, "same")
duck = 1 - np.clip(venv * 6, 0, .55)
mix = music * .55 * duck[:, None] + sfx * .7 + voice * 1.1
# simple reverb-ish width on music+sfx
for dly, g in [(0.031, .18), (0.047, .14), (0.071, .1)]:
    d = int(dly * SR); mix[d:, 0] += mix[:-d, 1] * g * .5; mix[d:, 1] += mix[:-d, 0] * g * .5
# fades + soft clip + normalise
mix[: int(.05 * SR)] *= np.linspace(0, 1, int(.05 * SR))[:, None]
mix[-int(1.2 * SR):] *= np.linspace(1, 0, int(1.2 * SR))[:, None] ** 1.5
mix = np.tanh(mix * 1.1)
mix *= .89 / np.abs(mix).max()
os.makedirs(os.path.join(here, "out"), exist_ok=True)
with wave.open(os.path.join(here, "out", "score.wav"), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("score.wav written")
