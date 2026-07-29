import { Fragment, type CSSProperties } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { DURATION, EASE_OUT_EXPO, STAGGER, VIEWPORT_ONCE } from '../lib/motion'

type Tag = 'h1' | 'h2' | 'h3'

interface RevealHeadingProps {
  /** One string per visual line — a <br/> is inserted between lines. */
  lines: string[]
  as?: Tag
  className?: string
  style?: CSSProperties
  /** Animate on mount instead of on scroll — use for above-the-fold headings. */
  eager?: boolean
  /** Extra delay (seconds) before the first word starts, e.g. to follow an eyebrow. */
  delay?: number
  viewportMargin?: string
}

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.tight } },
}

const wordItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT_EXPO } },
}

/**
 * Word-level (never character-level) staggered headline reveal.
 *
 * Accessibility: the heading tag carries `aria-label` with the full plain
 * text, and the animated word spans are `aria-hidden`, so assistive tech
 * reads one clean string instead of N separate inline spans. Only
 * `transform`/`opacity` are animated (no layout properties). Under
 * `prefers-reduced-motion` this renders as plain static text in its final
 * state immediately — never mid-animation, never stuck invisible.
 */
export default function RevealHeading({
  lines,
  as = 'h2',
  className,
  style,
  eager = false,
  delay = 0,
  viewportMargin = VIEWPORT_ONCE.margin,
}: RevealHeadingProps) {
  const prefersReduced = useReducedMotion()
  const Tag = as

  if (prefersReduced) {
    return (
      <Tag className={className} style={style}>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </Tag>
    )
  }

  const fullText = lines.join(' ')
  const viewportProps = eager
    ? { initial: 'hidden' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport: { once: true, margin: viewportMargin } }

  return (
    <Tag className={className} style={style} aria-label={fullText}>
      <motion.span
        variants={wordContainer}
        transition={{ delayChildren: delay }}
        aria-hidden="true"
        style={{ display: 'inline' }}
        {...viewportProps}
      >
        {lines.map((line, li) => {
          const words = line.split(' ')
          return (
            <Fragment key={li}>
              {words.map((word, wi) => (
                <motion.span
                  key={`${li}-${wi}`}
                  variants={wordItem}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                  {wi < words.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
              {li < lines.length - 1 && <br />}
            </Fragment>
          )
        })}
      </motion.span>
    </Tag>
  )
}
