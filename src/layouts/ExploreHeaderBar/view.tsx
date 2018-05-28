import * as React from 'react'
import BaseHeaderBar from '../HeaderBar'
import * as style from './style.scss'
import { Link } from 'react-router-dom'

const SlideNav = () => {
  return (
    <div className={style.slideNav}>
      <Link to="/explore/custom">个性推荐</Link>
      <Link to="/explore/dj">主播电台</Link>
    </div>
  )
}

export default class ExploreHeaderBar extends React.Component {
  public render() {
    return (
      <BaseHeaderBar render={SlideNav} />
    )
  }
}
