import { Outlet, useLocation } from 'react-router-dom'
import { animated, useTransition } from '@react-spring/web'
export const WelcomeLayout: React.FC = () => {
  const location = useLocation()
  const transitions = useTransition(location.pathname, {
    // 进入状态
    from: { transform: 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 退出状态
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 5000 }
  })

  return transitions((style, pathname) => {
    return <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'center' }}>
        <Outlet />
      </div>
    </animated.div>
  })
}
