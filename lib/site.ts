// Single source of truth for page copy, SEO metadata, JSON-LD and llms.txt.

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/pawse").replace(/\/$/, "");
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://salahu01.github.io/pawse").replace(/\/$/, "");
export const REPO = "https://github.com/salahu01/pawse-app";
export const DOWNLOAD = `${REPO}/releases/latest`;
export const VERSION = "1.0.1";
/** Prefix for files in /public (static export does not add basePath to plain <img> src). */
export const asset = (p: string) => `${BASE_PATH}${p}`;
export const absoluteUrl = (p = "/") => `${SITE_URL}${p === "/" ? "/" : p}`;

export const site = {
  name: "Pawse",
  title: "Pawse: Cute Water, Habit & Break Reminder for Mac",
  tagline: "A tiny friend that cares about you.",
  description:
    "Pawse is a free, open-source macOS menu bar app. A cute 3D pet walks onto your screen to remind you to drink water, keep habits like stretching every 30 minutes, and take screen-time breaks, with an optional hard block.",
  keywords: [
    "water reminder app for mac",
    "drink water reminder mac",
    "break reminder mac",
    "screen time break app mac",
    "habit tracker mac",
    "stretch reminder mac",
    "desktop pet mac",
    "cute reminder app",
    "eye strain 20-20-20 reminder",
    "hydration tracker",
    "pomodoro break mac",
    "open source mac app",
    "menu bar app",
    "Pawse",
  ],
  author: { name: "Muhammed Swalahudheen C V", url: "https://salahu01.github.io", github: "https://github.com/salahu01" },
  themeColor: "#fbf7ff",
  requirements: "macOS 13 Ventura or later · Apple silicon & Intel",
};

export const features = [
  {
    emoji: "💧",
    title: "Stay hydrated",
    body: "Set a daily goal and glass size. Your pet visits on your schedule, only during your active hours, and stops once you reach your goal.",
    bullets: ["Animated water glass and streaks", "7-day chart and month calendar", "Log a glass from the menu bar in one click"],
    shot: "/media/screen-water.jpg",
    alt: "Pawse water tracker showing a 75% full glass, streaks and a 7-day chart",
  },
  {
    emoji: "✅",
    title: "Habits on any interval",
    body: "Stretch every 30 minutes, walk every 45, rest your eyes every 20. Create any habit with an emoji, a daily goal and a reminder interval, and your pet asks about it.",
    bullets: ["Any interval from 1 minute to 12 hours", "Per-habit streaks, chart and calendar", "Presets: stretch, eyes, posture, walk, vitamins"],
    shot: "/media/screen-habits.jpg",
    alt: "Pawse habits page with a stretch habit, streak of 11 days and a monthly calendar",
  },
  {
    emoji: "🖥️",
    title: "Screen time that cares",
    body: "Pawse measures how long you have actively used your Mac. Stepping away for 3 minutes counts as a break. After 30 minutes of continuous use, your pet suggests one.",
    bullets: ["Today by hour and the last 7 days", "Breaks taken and skipped", "Optional daily screen-time limit"],
    shot: "/media/screen-screen.jpg",
    alt: "Pawse screen time page with an hourly chart and weekly totals",
  },
];

export const pets = [
  { id: "kid", name: "Momo", desc: "The chatty chibi. Has a real voice, offers you a water bottle and takes a big sip when you do." },
  { id: "cat", name: "Mochi", desc: "Tail swishes, ears twitch, and a meow you won't want to ignore." },
  { id: "penguin", name: "Pip", desc: "Waddles in and flaps both flippers when you drink. Pure joy." },
  { id: "capybara", name: "Yuzu", desc: "Calm, chill, and carrying an orange on its head. Squeaks softly." },
  { id: "bunny", name: "Boo", desc: "A gentle ghost bunny that floats in, ears streaming. Ooo~" },
];

export const installSteps = [
  { name: "Download", text: "Download the latest Pawse .dmg from GitHub Releases." },
  { name: "Install", text: "Open the .dmg and drag Pawse into your Applications folder." },
  { name: "Open", text: "Open Pawse. It lives in the menu bar, and your pet walks in to say hi. On first launch, if macOS cannot verify the developer, right-click Pawse → Open → Open." },
];

export const faqs = [
  {
    q: "What is Pawse?",
    a: "Pawse is a free, open-source macOS menu bar app that reminds you to drink water, keep your habits and take breaks. Instead of a notification, a cute 3D pet walks onto your screen and asks you, for example \"Did you drink water?\". You answer yes or not yet.",
  },
  {
    q: "Is Pawse free?",
    a: "Yes. Pawse is completely free and open source under the MIT licence. There are no ads, subscriptions, in-app purchases or accounts.",
  },
  {
    q: "Which Macs and macOS versions does Pawse support?",
    a: "Pawse runs on macOS 13 Ventura, macOS 14 Sonoma, macOS 15 Sequoia and newer, on both Apple silicon (M1, M2, M3, M4) and Intel Macs. The download is a universal app.",
  },
  {
    q: "How do I get a reminder to stretch every 30 minutes on my Mac?",
    a: "Open Pawse → Habits → Add → Stretch (or a custom habit), turn on \"Pet reminds me\" and set the interval to 30 minutes. Your pet will walk in every 30 minutes and ask \"Did you stretch?\". You can use any interval for any habit.",
  },
  {
    q: "Can Pawse remind me to take breaks from the screen?",
    a: "Yes. Pawse tracks active screen time from keyboard and mouse activity and, after 30 minutes of continuous use (adjustable), asks you to take a break. Breaks show a calm full-screen countdown with tips like the 20-20-20 eye rule. Stepping away for 3 minutes counts as a break automatically.",
  },
  {
    q: "What is hard block?",
    a: "Hard block is an optional mode for water, any habit or breaks. When a reminder is due, the pet covers the whole screen and it only unlocks when you confirm you did it. Breaks in hard block cannot be snoozed or ended early. For safety, holding Esc for 5 seconds always unlocks.",
  },
  {
    q: "Does Pawse collect my data?",
    a: "No. Pawse makes no network requests and has no analytics or accounts. Your history stays on your Mac. For screen time it reads only how many seconds ago you last pressed a key or moved the mouse, never what you type or which apps you use.",
  },
  {
    q: "Which pets are included?",
    a: "Five 3D pets: Momo the Chibi (with a voice), Mochi the Cat, Pip the Penguin, Yuzu the Capybara and Boo the Ghost Bunny. You can also drop any .usdz 3D model into Pawse to use it as a pet.",
  },
  {
    q: "How is Pawse different from other water or break reminder apps?",
    a: "Most reminder apps send notifications that are easy to swipe away. Pawse combines water tracking, habit reminders on any interval and screen-time breaks in one app, delivered by an animated pet with expressions and sounds, plus an optional hard block for habits you're serious about.",
  },
];
