import * as React from 'react'
import * as style from './style.scss'
import { Link } from 'react-router-dom'

class App extends React.Component {
  public render() {
    return (
      <ul className={style.bottomBar}>
        <li><Link to="/explore">发现</Link></li>
        <li><Link to="/video">视频</Link></li>
        <li><Link to="/mine">我的</Link></li>
        <li><Link to="/friends">朋友</Link></li>
        <li><Link to="/account">账号</Link></li>
      </ul>
    )
  }
}

export default App