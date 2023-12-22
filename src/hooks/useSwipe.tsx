import type { MutableRefObject } from "react";
import { useEffect, useRef, useState } from "react";

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}
export function useSwipe(elementRef: MutableRefObject<HTMLElement | null>, config?: Config) {
  const [direction, setDirection] = useState<'' | 'right' | 'left'>('')
  const x = useRef(-1); // 为什么默认值是-1呢，因为0是有意义的，0是屏幕的最左边！！
  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    console.log('start')
    x.current = e.touches[0].clientX
  }
  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    console.log('move')
    const newX = e.touches[0].clientX;
    const d = newX - x.current;
    // 当滑动距离绝对值小于3px时，忽略滑动不计
    if (Math.abs(d) < 3) {
      setDirection('')
    }
    else if (d > 0) {
      setDirection('right')
    }
    else {
      setDirection('left')
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    console.log('end')
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
