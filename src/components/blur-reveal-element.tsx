import { AnimatePresence, motion } from "motion/react"
import type React from "react"

export interface BlurRevealElementProps {
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
}

export function BlurRevealElement({
  children,
  className,
  delay = 0,
  speedReveal = 1.5,
  speedSegment = 0.5,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  as = "div",
  style,
  inView = false,
  once = true,
}: BlurRevealElementProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  const stagger = 0.03 / speedReveal
  const baseDuration = 0.3 / speedSegment

  const variants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay,
        duration: baseDuration,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(12px)",
      y: 10,
      transition: {
        duration: Math.max(baseDuration - stagger, 0.01),
      },
    },
  }

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          whileInView={inView ? "visible" : undefined}
          animate={inView ? undefined : "visible"}
          exit="exit"
          variants={variants}
          viewport={{ once }}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          {children}
        </MotionTag>
      )}
    </AnimatePresence>
  )
}
