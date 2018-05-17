import * as React from 'react'
import * as style from './style.scss'
import { Link } from 'react-router-dom'

class App extends React.Component {
  public render() {
    return (
      <nav className={style.headerBar}>
        <input type="input" />
        <Link to="/playing">🎵</Link>
      </nav>
    )
  }
}

export default App