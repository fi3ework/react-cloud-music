import * as React from 'react'
import BaseHeaderBar from '@/layouts/HeaderBar'
import * as style from '@/layouts/ExploreHeaderBar/style.scss'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import emitter from '@/utils/ee'
import { SlideContext } from '@/router/slideContext'

type IState = {
  index: number
  disX: number
}

class SlideNav extends React.Component<any, IState> {
  ee = emitter
  INDEX0_POS_X = window.screen.width * 0.26
  INDEX1_POS_X = window.screen.width * 0.6

  state = {
    index: 0,
    disX: this.INDEX0_POS_X
  }

  componentDidMount() {
    this.ee.on('onTouchMove', this.changePos)
    this.ee.on('onTouchEnd', this.stickScroll)
  }

  changePage: (index: number) => void = index => {
    this.setState({
      index
    })
  }

  changePos: (disXPercent: number) => void = disXPercent => {
    const disX = disXPercent * (this.INDEX1_POS_X - this.INDEX0_POS_X) + this[`INDEX${this.state.index}_POS_X`]
    this.setState({
      disX
    })
  }

  stickScroll: (index: number) => void = index => {
    if (index >= 0) {
      this.setState({
        index: index,
        disX: this[`INDEX${index}_POS_X`]
      })
    }
  }

  computePos: (disX: number) => number = disX => {
    return 2
  }

  render() {
    console.log(this.props.pos)
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
          style={{
            transform: `translate3d(${this.state.disX}px, 0, 0)`
          }}
          className={cs({
            [style.slider]: true
            // [style.index0]: this.state.index === 0,
            // [style.index1]: this.state.index === 1
          })}
        />
      </div>
    )
  }
}

export default () => {
  return (
    <SlideContext.Consumer>
      {pos => <BaseHeaderBar component={SlideNav} style={style.headerBar} pos={pos} />}
    </SlideContext.Consumer>
  )
}
