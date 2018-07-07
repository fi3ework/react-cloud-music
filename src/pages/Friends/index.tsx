import * as React from 'react'
import * as style from './style.scss'

interface IProps {
  style: React.CSSProperties
}

class App extends React.Component<IProps> {
  // count: number

  // state = {
  //   count: 0
  // }

  // componentWillUnmount() {
  //   console.log('=== Friends will unmount  =====')
  // }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({
  //       count: this.state.count + 1
  //     })
  //   }, 200)
  // }

  render() {
    return (
      <div className={style.wrapper}>
        <h1>🍻 friends page</h1>
      </div>
    )
  }
}

export default App
