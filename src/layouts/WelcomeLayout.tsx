import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

export const WelcomeLayout: React.FC = () => {
  // map写在外面会造成内存泄漏，即声明的变量是全局变量，会一直存在
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation() // 获取当前地址栏的信息
  // location.pathname === /welcome/1
  // location.pathname === /welcome/2
  const outlet = useOutlet() // 当前路径对应的outlet
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    // 进入状态
    from: location.pathname === '/welcome/1'
      ? { transform: 'translateX(0%)' }
      : { transform: 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 退出状态
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 }
  })
  return transitions((style, pathname) => {
    return <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'center' }}>
        {map.current[pathname]}
      </div>
    </animated.div>
  })
}
