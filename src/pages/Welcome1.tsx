import * as React from 'react'
import { NavLink } from 'react-router-dom'
export const Welcome1: React.FC = () => {
  return (
    <div b-1 b-blue> 1 <NavLink to="/welcome/2">下一页</NavLink> </div>
  )
}
