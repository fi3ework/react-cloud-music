import React, { ReactNode } from 'react'
import style from './style.scss'
import { Link } from 'react-router-dom'

type IProps = {
  render?: () => ReactNode
  component?: React.ComponentClass
}

const HeaderBar: React.SFC<IProps> = ({ component, render }) => {
  let children
  if (component) {
    children = React.createElement(component)
  } else if (render) {
    children = render()
  }

  return (
    <nav className={style.headerBar}>
      <div>
        <Link className={style.playingLink} to="/playing">
          <i className={'iconfont-ncm'}>&#xe6cf;</i>
        </Link>
        <input className={style.search} placeholder="Music on. World off." type="text" />
      </div>
      {children}
    </nav>
  )
}

export default HeaderBar
