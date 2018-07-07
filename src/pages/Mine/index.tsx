import * as React from 'react'
import * as style from './style.scss'

interface IProps {
  style: React.CSSProperties
}

class App extends React.Component<IProps> {
  render() {
    return (
      <div className={style.wrapper}>
        <h1>👶🏻 mine page</h1>
      </div>
    )
  }
}

export default App
