import React, { ReactNode } from 'react'
import style from '@/layouts/HeaderBar/style.scss'
import { Link } from 'react-router-dom'
import cs from 'classnames'

type IProps = {
  style?: any
  render?: (props) => ReactNode
  component?: React.ComponentClass
  pos?: number
  pageIndex?: number
  setPageIndex?: any
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
    <nav
      className={cs({
        [style.headerBar]: true,
        [props.style]: true
      })}
    >
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
