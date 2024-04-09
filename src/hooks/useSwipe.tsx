import type { MutableRefObject } from "react";
import { useEffect, useRef, useState } from "react";

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}
export function useSwipe(elementRef: MutableRefObject<HTMLElement | null>, config?: Config) {
  const [direction, setDirection] = useState<'' | 'left' | 'right' | 'up' | 'down'>('')
  const x = useRef(-1); // 为什么默认值是-1呢，因为0是有意义的，0是屏幕的最左边！！
  const y = useRef(-1)
  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    x.current = e.touches[0].clientX
    y.current = e.touches[0].clientY
  }
  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const newX = e.touches[0].clientX
    const newY = e.touches[0].clientY
    const dx = newX - x.current
    const dy = newY - y.current
    if (Math.abs(dx) > Math.abs(dy)) {
      // 当滑动距离绝对值小于3px时，忽略滑动不计
      if (Math.abs(dx) < 3) {
        setDirection('')
      } else if (dx > 0) {
        setDirection('right')
      } else {
        setDirection('left')
      }
    } else {
      if (Math.abs(dy) < 3) {
        setDirection('')
      } else if (dy > 0) {
        setDirection('down')
      } else {
        setDirection('up')
      }
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }

  useEffect(() => {
    if (!elementRef.current) {
      return
    }
    elementRef.current.addEventListener('touchstart', onTouchStart)
    elementRef.current.addEventListener('touchmove', onTouchMove)
    elementRef.current.addEventListener('touchend', onTouchEnd)
    return () => {
      if (!elementRef.current) {
        return
      }
      elementRef.current.removeEventListener('touchstart', onTouchStart)
      elementRef.current.removeEventListener('touchmove', onTouchMove)
      elementRef.current.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return { direction }
}
