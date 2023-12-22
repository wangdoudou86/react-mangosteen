import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useSwipe } from '../hooks/useSwipe'
const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/welcome/xxx',
}
export const WelcomeLayout: React.FC = () => {
  // map写在外面会造成内存泄漏，即声明的变量是全局变量，会一直存在
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation() // 获取当前地址栏的信息
  const outlet = useOutlet() // 当前路径对应的outlet
  map.current[location.pathname] = outlet
  const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  const mainRef = useRef(null)
  const { direction } = useSwipe(mainRef, { onTouchStart: e => e.preventDefault() })
  const animating = useRef(false) // 手指是否在屏幕上滑动
  const nav = useNavigate();
  const transitions = useTransition(location.pathname, {
    // 进入状态
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 退出状态
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      setExtraStyle({ position: 'relative' })
      // 动画结束时要变为false！！！
      animating.current = false
    }
  })

  const onSkip = () => {
    localStorage.setItem('hasReadWelcomes', 'yes')
  }

  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) {
        return
      }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, linkMap])
  return (
    <div className="bg-#5f34bf" h-screen flex flex-col items-stretch pb-16px>
    <header shrink-0 text-center pt-64px>
      <img src={logo} w-64px h-69px />
      <h1 text="#D4D4EE" text-32px>山竹记账</h1>
    </header>
    <main shrink-1 grow-1 relative ref={mainRef}>
      {transitions((style, pathname) =>
        <animated.div key={pathname} style={{ ...style, ...extraStyle }} w="100%" h="100%" p-16px flex>
          <div grow-1 bg-white flex justify-center items-center rounded-8px>
            {map.current[pathname]}
          </div>
        </animated.div>
      )}
    </main>
    <footer shrink-0 text-center text-24px text-white grid grid-cols-3 grid-rows-1>
      <Link style={{ gridArea: '1 / 2 / 2 / 3' }} to={linkMap[location.pathname]}>下一页</Link>
      <Link style={{ gridArea: '1 / 3 / 2 / 4' }} to="/home" onClick={onSkip}>跳过</Link>
    </footer>
  </div>
  )
}
