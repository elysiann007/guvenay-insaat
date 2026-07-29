/**
 * === SHARED MOTION SYSTEM ===========================================
 * Single source of truth for timing/easing so every component shares
 * one rhythm instead of inventing its own durations. Only `transform`
 * and `opacity` are driven here — nothing that triggers layout.
 *
 * Choreography model per section: eyebrow -> heading -> body -> CTA.
 * Each tier gets a slightly different travel distance/duration so the
 * eye is led through the hierarchy, while the *stagger* between tiers
 * stays within the 40-60ms band requested by the design brief.
 *
 * Reduced motion: variants are produced by `useFadeVariants()`, a hook,
 * specifically so each call site can bake in the live
 * `prefers-reduced-motion` result. framer-motion's JS-driven tweens are
 * NOT covered by the `@media (prefers-reduced-motion)` CSS block in
 * index.css (that block only zeroes CSS transition/animation duration) —
 * without this, a whileInView fade would still visibly animate in for
 * reduced-motion users. When reduced motion is on, `hidden` and
 * `visible` collapse to the same resting values with a 0s transition, so
 * content is present in its final state immediately, never mid-tween.
 * ====================================================================
 */
import { useReducedMotion, type Variants } from 'framer-motion'

/** Expo-out — the "premium" curve used for entrances and reveals. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
/** Softer standard ease-out — used for hovers / micro-interactions. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  /** Micro-interactions: hover lift, tap feedback, arrow nudges. */
  micro: 0.2,
  /** Small/eyebrow-scale entrances. */
  fast: 0.32,
  /** Default body-copy entrance. */
  base: 0.45,
  /** Headings — a touch slower so they feel weightier. */
  slow: 0.55,
  /** Large imagery / hero-scale entrances. */
  slower: 0.8,
} as const

/** Stagger gap between sibling children — 40-60ms band. */
export const STAGGER = {
  tight: 0.04,
  base: 0.05,
  loose: 0.06,
} as const

/** Default `whileInView` viewport for scroll-triggered reveals. Generous
 *  margin so content reliably reveals well before it's fully on screen —
 *  never right at the edge, where a fast scroll could skip the trigger. */
export const VIEWPORT_ONCE = { once: true, margin: '-10% 0px -10% 0px' } as const

function makeFadeUp(y: number, duration: number, reduceMotion: boolean): Variants {
  if (reduceMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    }
  }
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT_EXPO } },
  }
}

export interface FadeVariants {
  /** Container — stagger 40-60ms between children (0 under reduced motion). */
  stagger: Variants
  /** Small uppercase eyebrow label — quick, short travel. */
  eyebrow: Variants
  /** Sub-heading tier (for headings not using <RevealHeading/>). */
  heading: Variants
  /** Body copy tier. */
  body: Variants
  /** CTA / control tier — settles last, shortest travel. */
  cta: Variants
  /** Generic list item (cards, rows) inside a staggered container. */
  item: Variants
  /** Large single-image entrance (About portrait, Process photo). */
  media: Variants
}

/**
 * Reduced-motion-aware fade-up variant set. Call once per component and
 * reuse `.eyebrow` / `.heading` / `.body` / `.cta` / `.item` / `.media` /
 * `.stagger` on the relevant motion elements so the whole site shares one
 * rhythm. Under `prefers-reduced-motion`, every tier resolves to a no-op
 * (opacity 1, no travel, 0s transition) so content is never invisible or
 * caught mid-animation.
 */
export function useFadeVariants(): FadeVariants {
  const reduceMotion = !!useReducedMotion()
  return {
    stagger: {
      hidden: {},
      visible: { transition: { staggerChildren: reduceMotion ? 0 : STAGGER.base, delayChildren: 0 } },
    },
    eyebrow: makeFadeUp(12, DURATION.fast, reduceMotion),
    heading: makeFadeUp(28, DURATION.slow, reduceMotion),
    body: makeFadeUp(20, DURATION.base, reduceMotion),
    cta: makeFadeUp(16, DURATION.base, reduceMotion),
    item: makeFadeUp(22, DURATION.base, reduceMotion),
    media: makeFadeUp(24, DURATION.slower, reduceMotion),
  }
}

/** Tap/press feedback for buttons and icon controls — subtle scale only,
 *  never used on elements whose bounds must stay fixed for touch-target
 *  purposes (the visual scale doesn't change the hit area). */
export const tapScale = { scale: 0.97 }

/** Hover lift for cards — transform only, no shadow-triggered reflow. */
export const hoverLift = { y: -4 }

/**
 * Press feedback for buttons/icon controls — pass the result to
 * `whileTap`. Returns `undefined` under `prefers-reduced-motion` so no
 * scale transform runs; the tap target's hit area is unaffected either
 * way since `scale` never resizes layout, only the visual transform.
 */
export function useTapFeedback() {
  const reduceMotion = useReducedMotion()
  return reduceMotion ? undefined : tapScale
}
