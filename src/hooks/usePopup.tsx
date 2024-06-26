import { useState } from 'react'
import ReactDOM from 'react-dom'
import type { ReactNode } from 'react'
import { Popup } from '../components/Popup'
import { rootDiv } from '../main'

export function usePopup(initVisible = false, children: ReactNode) {
  const [visible, setVisible] = useState(initVisible)
  const popup = ReactDOM.createPortal(<Popup visible={visible} onClickMask={() => setVisible(false)} >{children}</Popup>, rootDiv)
  return {
    popup,
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
    toggle() {
      setVisible(!visible)
    }
  }
}
