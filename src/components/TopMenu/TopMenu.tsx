import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'
import { CurrentUser } from './CurrentUser'
import { Menu } from './Menu'

interface Props {
  onClickMask?: () => void
  visible?: boolean
}
export const TopMenu: React.FC<Props> = (props) => {
  const { onClickMask, visible } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      // 动画开始时
      // 显示时，opacity 0 -> 1
      // 隐藏时，opacity 1 -> 0
      // 为什么不等于0呢？因为打印出来的opacity值不是0啊啊啊啊
      if (value.opacity < 0.1) {
        setMaskVisible(true)
      }
    },
    onRest: ({ value }) => {
      // 动画结束时
      // 动画快结束时，当opacity值小于0.1，说明是在隐藏
      if (value.opacity < 0.1) {
        setMaskVisible(false)
      }
    },
  })

  const styles = {
    ...maskStyles,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
  }

  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)',
  })
  return (
    <>
      <animated.div fixed top-0 left-0 w="100%" h="100%" className="bg-black:75"
        z="[calc(var(--z-menu)-1)]"
        style={styles}
        onClick={onClickMask}
      />
      <animated.div fixed top-0 left-0 w="70vw" max-w-20em h-screen flex flex-col
        z="[var(--z-menu)]" style={menuStyles}>
        <CurrentUser className="grow-0 shrink-0" />
        <Menu className="grow-1 shrink-1" />
      </animated.div>
    </>
  )
}
