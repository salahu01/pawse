from kokoro import KPipeline
import numpy as np, soundfile as sf
lines = {
 "ask": "Hey hey! Did you drink water?",
 "sad": "Oh, okay. Momo comes back soon.",
 "plead": "Please? Just one sip?",
 "happy": "Yay! One glass done!",
 "habit": "Did you stretch? Your screen unlocks when you say yes.",
 "thanks": "Thank you!",
 "break": "You've been on screen fifty minutes. Break time?",
 "breakstart": "Let's rest together.",
 "breakdone": "Break's over. You did so great!",
 "goal": "Look at you. Eight glasses today!",
}
pipe = KPipeline(lang_code='a')
for k, t in lines.items():
    a = np.concatenate([x for _, _, x in pipe(t, voice="af_bella", speed=0.95)])
    sf.write(f"raw_{k}.wav", a, 24000)
