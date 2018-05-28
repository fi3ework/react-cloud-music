import * as React from 'react'
import * as style from './style.scss'
import { Link } from 'react-router-dom'


type Irender = () => void

interface IProps{
  render?: Irender;
}

class App extends React.Component<IProps> {
  public render() {
    return (
      <nav className={style.headerBar}>
        <div>
          <input type="input" />
          <Link to="/playing">🎵</Link>
        </div>
        {this.props.render && this.props.render()}
      </nav>
    )
  }
}

export default App