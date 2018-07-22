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
        <a href="https://github.com/fi3ework/react-cloud-music" target="_blank">
          <Fork />
        </a>
        <h1>👤 account page</h1>
      </div>
    )
  }
}

export default App
