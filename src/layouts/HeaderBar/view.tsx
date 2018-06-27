import React, { ReactNode } from 'react'
import style from './style.scss'
import { Link } from 'react-router-dom'

type IProps = {
  render?: (props) => ReactNode
  component?: React.ComponentClass
}

const HeaderBar: React.SFC<IProps> = props => {
  let children
  const { component, render } = props
  if (component) {
    children = React.createElement(component, props)
  } else if (render) {
    children = render(props)
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
