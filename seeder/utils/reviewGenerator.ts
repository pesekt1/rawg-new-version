export type ReviewPersona =
  | "story_lover"
  | "completionist"
  | "mechanics_first"
  | "chill_casual"
  | "challenge_hunter"
  | "tech_snob";

type Rng = () => number;

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(seed: number): Rng {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: Rng, items: T[]): T {
  return items[Math.floor(rng() * items.length)];
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function personaForUser(username: string): ReviewPersona {
  const seed = xmur3(username)();
  const rng = mulberry32(seed);
  return pick(rng, [
    "story_lover",
    "completionist",
    "mechanics_first",
    "chill_casual",
    "challenge_hunter",
    "tech_snob",
  ]);
}

/**
 * Returns a 2..5 rating (matches your client UI).
 */
export function ratingFor(rng: Rng, persona: ReviewPersona): number {
  // Base distribution: mostly 4s, some 3s/5s, fewer 2s.
  const r = rng();
  let rating = r < 0.08 ? 2 : r < 0.32 ? 3 : r < 0.78 ? 4 : 5;

  // Persona biases
  if (persona === "tech_snob" && r < 0.75) rating -= 1;
  if (persona === "story_lover" && r > 0.65) rating += 1;
  if (persona === "challenge_hunter" && r < 0.2) rating -= 1;

  return clamp(rating, 2, 5);
}

export function generateLongReview(opts: {
  gameName: string;
  rating: number;
  persona: ReviewPersona;
  userId: number;
  gameId: number;
}): string {
  const seed = xmur3(`${opts.userId}:${opts.gameId}:${opts.gameName}`)();
  const rng = mulberry32(seed);

  const tone =
    opts.rating >= 5
      ? "very_positive"
      : opts.rating === 4
      ? "positive"
      : opts.rating === 3
      ? "mixed"
      : "negative";

  const hours =
    5 + Math.floor(rng() * 70) + (tone === "very_positive" ? 10 : 0);

  const openers: Record<typeof tone, string[]> = {
    very_positive: [
      `I didn’t expect ${opts.gameName} to click this hard, but it absolutely did.`,
      `${opts.gameName} is the kind of game that turns “one more session” into an entire evening.`,
    ],
    positive: [
      `${opts.gameName} lands most of what it’s trying to do, and it’s easy to recommend.`,
      `After about ${hours} hours with ${opts.gameName}, I’m walking away impressed overall.`,
    ],
    mixed: [
      `${opts.gameName} has real strengths, but enough rough edges that I never fully settled in.`,
      `I wanted to love ${opts.gameName}, and I can see why people do — it just didn’t completely come together for me.`,
    ],
    negative: [
      `I went into ${opts.gameName} optimistic, but the friction kept pulling me out of it.`,
      `${opts.gameName} has moments, but they’re buried under too many annoyances to ignore.`,
    ],
  };

  const personaBits: Record<ReviewPersona, string[]> = {
    story_lover: [
      `The game’s best moments are the ones that let the atmosphere breathe and build tension naturally.`,
      `When it slows down and commits to mood, it’s genuinely memorable.`,
    ],
    completionist: [
      `I tend to clear side content, and there’s a satisfying cadence to ticking things off without it feeling like pure busywork.`,
      `The optional stuff is uneven, but the best of it adds texture rather than padding.`,
    ],
    mechanics_first: [
      `The moment-to-moment feel is the main win here; once you learn its rhythm, it’s hard to put down.`,
      `There’s more mechanical depth than it seems at first, and mastering it feels rewarding.`,
    ],
    chill_casual: [
      `It’s easy to pick up, play for a bit, and walk away feeling like you made progress.`,
      `Even when it gets tense, it rarely feels unfair, which made it a good “after work” game for me.`,
    ],
    challenge_hunter: [
      `When it gets hard, it usually asks you to execute and learn, not just grind.`,
      `It rewards pattern recognition and cleaning up mistakes; improvement feels tangible.`,
    ],
    tech_snob: [
      `Presentation is doing a lot of heavy lifting, but I did notice some technical hiccups that add up.`,
      `It looks great in stills, but the moment-to-moment smoothness isn’t always consistent.`,
    ],
  };

  const gameplay = [
    `The core loop is familiar, but the pacing is mostly solid: you get a goal, the game iterates on it, and you’re rarely stuck doing the exact same thing for too long.`,
    `The onboarding could be clearer in places, but once it “clicks,” the feedback (audio/visual cues) teaches you what matters without burying you in tutorials.`,
    `There’s a nice sense of forward motion — even short sessions feel productive rather than aimless.`,
  ];

  const flaws: Record<typeof tone, string[]> = {
    very_positive: [
      `My complaints are mostly polish-level: a couple of UI/flow decisions and minor pacing quirks.`,
      `It’s not perfect, but the rough spots never outweighed the fun for me.`,
    ],
    positive: [
      `A couple of systems feel under-explained, and the early hours can be slower than they need to be.`,
      `There are a few places where the game could trim friction (menus, pacing, or repetition).`,
    ],
    mixed: [
      `I kept bumping into small annoyances — not deal-breakers individually, but they dulled the momentum.`,
      `The pacing is uneven: it swings between “I’m locked in” and “why am I doing this right now?”`,
    ],
    negative: [
      `The big issue is that the game asks for patience without consistently paying it back.`,
      `Some design choices feel like they’re wasting your time rather than challenging you.`,
    ],
  };

  const conclusion: Record<typeof tone, string[]> = {
    very_positive: [
      `If this is remotely your genre, it’s an easy “yes.”`,
      `I’m genuinely glad I played it — it stuck with me after I put it down.`,
    ],
    positive: [
      `Not for everyone, but for the right player it’s a really solid time.`,
      `I’d recommend it, especially if you value steady progression and good moment-to-moment feel.`,
    ],
    mixed: [
      `I can recommend it with caveats: there’s a good game here, but you need tolerance for some rough edges.`,
      `Worth trying if you’re curious, but I wouldn’t blame anyone for bouncing off it.`,
    ],
    negative: [
      `Unless you’re already a huge fan of this style, I’d skip it and spend your time elsewhere.`,
      `I don’t hate it, but I can’t recommend it in its current shape.`,
    ],
  };

  // 6–8 paragraphs, “long but readable”
  const paras: string[] = [];
  paras.push(pick(rng, openers[tone]));
  paras.push(pick(rng, personaBits[opts.persona]));
  paras.push(pick(rng, gameplay));
  paras.push(pick(rng, gameplay));
  paras.push(pick(rng, flaws[tone]));
  paras.push(
    `For context, I put in roughly ${hours} hours. I’m not claiming that’s exhaustive, but it’s enough to see what the game is consistently good at—and what it struggles to smooth over.`
  );
  paras.push(pick(rng, conclusion[tone]));

  return paras.join("\n\n");
}
