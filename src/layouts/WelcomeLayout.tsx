import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
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
  const transitions = useTransition(location.pathname, {
    // 进入状态
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 退出状态
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 }
  })
  return (
    <div>
      <header>
        <img src={logo} />
        <h1>山竹记账</h1>
      </header>
      <main>
        {transitions((style, pathname) =>
          <animated.div key={pathname} style={style}>
            {map.current[pathname]}
          </animated.div>
        )}
      </main>
      <footer>
        <Link to={linkMap[location.pathname]}>下一页</Link>
        <Link to="/welcome/xxx">跳过</Link>
      </footer>
    </div>
  )
}
