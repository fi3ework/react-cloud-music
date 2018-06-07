import * as React from 'react'
import * as style from './style.scss'

interface IProps{
  style: any;
}


class App extends React.Component<IProps> {
  public render() {
    return (
      <div className={style.wrapper} style={{ ...this.props.style }}>
        <div className={style.content}>
          playing...
        </div>
      </div>
    )
  }
}

export default App
