import * as React from 'react'
import * as style from './style.scss'


interface IProps{
  style: any;
}

class App extends React.Component<IProps> {

  public count: any;

  public state = {
    count: 0
  }

  public componentWillUnmount() {
    console.log('=== Friends will unmount  =====')
  }

  public componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      })
    }, 200)
  }

  public render() {
    return (
      <div className={style.wrapper} style={{ ...this.props.style }}>
        <h1>a</h1>
        <h1>b</h1>
        <h1>c</h1>
        <h1>d</h1>
        <h1>{this.state.count}</h1>
      </div>
    )
  }
}

export default App
