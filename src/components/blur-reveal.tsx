import { AnimatePresence, motion } from "motion/react"
import React from "react"

export interface BlurRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  speedReveal?: number
  speedSegment?: number
  trigger?: boolean
  onAnimationComplete?: () => void
  onAnimationStart?: () => void
  as?: keyof React.JSX.IntrinsicElements
  style?: React.CSSProperties
  inView?: boolean
  once?: boolean
  letterSpacing?: string | number
}

function extractTextContent(children: React.ReactNode): string {
  if (
    typeof children === "string" ||
    typeof children === "number" ||
    typeof children === "bigint"
  ) {
    return String(children)
  }

  if (Array.isArray(children)) {
    return children.map(extractTextContent).join("")
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return extractTextContent(children.props.children)
  }

  return ""
}

function renderAnimatedText(
  children: React.ReactNode,
  itemVariants: {
    hidden: { opacity: number; filter: string; y: number }
    visible: {
      opacity: number
      filter: string
      y: number
      transition: { duration: number }
    }
    exit: { opacity: number; filter: string; y: number }
  },
  letterSpacing: BlurRevealProps["letterSpacing"],
  keyPrefix = "node"
): React.ReactNode {
  if (
    typeof children === "string" ||
    typeof children === "number" ||
    typeof children === "bigint"
  ) {
    return String(children)
      .split(" ")
      .map((word, wordIndex, wordsArray) => (
        <span
          key={`${keyPrefix}-word-${wordIndex}`}
          className="inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${keyPrefix}-char-${wordIndex}-${charIndex}`}
              variants={itemVariants}
              className="inline-block"
              style={letterSpacing ? { marginRight: letterSpacing } : undefined}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < wordsArray.length - 1 && (
            <motion.span
              key={`${keyPrefix}-space-${wordIndex}`}
              variants={itemVariants}
              className="inline-block"
            >
              &nbsp;
            </motion.span>
          )}
        </span>
      ))
  }

  if (Array.isArray(children)) {
    return children.map((child, index) =>
      renderAnimatedText(
        child,
        itemVariants,
        letterSpacing,
        `${keyPrefix}-${index}`
      )
    )
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return React.cloneElement(children, {
      ...children.props,
      children: renderAnimatedText(
        children.props.children,
        itemVariants,
        letterSpacing,
        `${keyPrefix}-child`
      ),
    })
  }

  return children
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  speedReveal = 1.5,
  speedSegment = 0.5,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  as = "p",
  style,
  inView = false,
  once = true,
  letterSpacing,
}: BlurRevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  const stagger = 0.03 / speedReveal
  const baseDuration = 0.3 / speedSegment

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
    exit: {
      transition: {
        staggerChildren: stagger,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: baseDuration,
      },
    },
    exit: { opacity: 0, filter: "blur(12px)", y: 10 },
  }

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          whileInView={inView ? "visible" : undefined}
          animate={inView ? undefined : "visible"}
          exit="exit"
          variants={containerVariants}
          viewport={{ once }}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          <span className="sr-only">{extractTextContent(children)}</span>
          {renderAnimatedText(children, itemVariants, letterSpacing)}
        </MotionTag>
      )}
    </AnimatePresence>
  )
}
