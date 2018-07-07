import * as React from 'react'
import * as style from './style.scss'
import { Link, withRouter } from 'react-router-dom'

class BottomBar extends React.Component {
  render() {
    const linkData = [
      {
        router: 'explore',
        name: '发现'
      },
      {
        router: 'video',
        name: '视频'
      },
      {
        router: 'mine',
        name: '我的'
      },
      {
        router: 'friends',
        name: '朋友'
      },
      {
        router: 'account',
        name: '账号'
      }
    ]
    console.log(this.props)

    return (
      <ul className={style.bottomBar}>
        {linkData.map((item, index) => {
          return (
            <li key={index} style={{}}>
              <Link to={`/${item.router}`}>{item.name}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default withRouter(BottomBar)
