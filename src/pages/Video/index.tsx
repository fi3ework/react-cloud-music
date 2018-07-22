import * as React from 'react'
import * as style from './style.scss'
import Fork from '@/layouts/GithubFork'

interface IProps {
  style: React.CSSProperties
}

class App extends React.Component<IProps> {
  render() {
    return (
      <div className={style.wrapper}>
        <h1>🎞 video page</h1>
        <Fork />
      </div>
    )
  }
}

export default App
