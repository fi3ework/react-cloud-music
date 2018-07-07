import * as React from 'react'
import BaseHeaderBar from '../HeaderBar'
import * as style from './style.scss'
import { Link } from 'react-router-dom'
import cs from 'classnames'

type IState = {
  index: number
}

class SlideNav extends React.Component<any, IState> {
  state = {
    index: 0
  }

  changePage: (index: number) => void = index => {
    this.setState({
      index
    })
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.slideNav}>
          <Link to="/explore/custom" onClick={() => this.changePage(0)}>
            个性推荐
          </Link>
          <Link to="/explore/dj" onClick={() => this.changePage(1)}>
            排行榜
          </Link>
        </div>
        <div
          className={cs({
            [style.slider]: true,
            [style.index0]: this.state.index === 0,
            [style.index1]: this.state.index === 1
          })}
        />
      </div>
    )
  }
}

export default () => {
  return <BaseHeaderBar component={SlideNav} style={style.headerBar} />
}
