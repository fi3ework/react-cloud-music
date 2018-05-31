import * as React from 'react'
import * as style from './style.scss'
import { Link } from 'react-router-dom'


type Irender = () => void

interface IProps{
  render?: Irender;
  component?: any;
}

class App extends React.Component<IProps> {
  public render() {
    let children
    if (this.props.component) {
      children = React.createElement(this.props.component)
    } else if (this.props.render) {
      children = this.props.render()
    }

    return (
      <nav className={style.headerBar}>
        <div>
          <input type="input" />
          <Link to="/playing">🎵</Link>
        </div>
        {children}
      </nav>
    )
  }
}

export default App