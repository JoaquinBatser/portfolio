import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import IconPointerFill18 from "./icon-pointer"
import IconWindowPointerFill18 from "./icon-window-pointer"

const LINK_SELECTOR = "a, [role='link']"

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 30, stiffness: 500, mass: 0.5 })
  const springY = useSpring(y, { damping: 30, stiffness: 500, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) {
      return
    }

    setEnabled(true)
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    const handleOver = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      setIsLink(target.closest(LINK_SELECTOR) !== null)
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseover", handleOver)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseover", handleOver)
    }
  }, [x, y])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ translateX: springX, translateY: springY }}
    >
      {isLink ? (
        <IconWindowPointerFill18 size="18px" className="text-foreground" />
      ) : (
        <IconPointerFill18 size="18px" className="text-foreground" />
      )}
    </motion.div>
  )
}