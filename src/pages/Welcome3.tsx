import * as React from 'react'
import { NavLink } from 'react-router-dom'
export const Welcome3: React.FC = () => {
  return (
    <div b-1 b-red> 3 <NavLink to="/welcome/4">下一页</NavLink> </div>
  )
}
