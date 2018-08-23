import * as React from 'react'
import BaseHeaderBar from '@/layouts/HeaderBar'
import * as style from '@/layouts/ExploreHeaderBar/style.scss'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import { SlideContext } from '@/router/slideContext'

type IState = {
  isGoingToStick: boolean
  prevPageIndex: number
  prevPos: number
}

type IProps = {
  pageIndex: number
  pos: number
  style: any
  component: any
}

class SlideNav extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    pageIndex: 0
  }

  INDEX0_POS_X = window.screen.width * (200 / 750)
  INDEX1_POS_X = window.screen.width * (450 / 750)

  state = {
    prevPos: 233,
    isGoingToStick: false,
    prevPageIndex: 0
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      isGoingToStick: nextProps.pos === prevState.prevPos,
      prevPos: nextProps.pos
    }
  }

  calcPosByPercent: (disXPercent: number) => number = disXPercent => {
    const disX = disXPercent * (this.INDEX1_POS_X - this.INDEX0_POS_X) + this[`INDEX${this.props.pageIndex}_POS_X`]
    return disX
  }

  render() {
    let disX = this.calcPosByPercent(this.props.pos)
    if (this.state.isGoingToStick) {
      disX = this[`INDEX${this.props.pageIndex}_POS_X`]
    }
    return (
      <div className={style.wrapper}>
        <div className={style.slideNav}>
          <Link to="/explore/custom">个性推荐</Link>
          <Link to="/explore/dj">排行榜</Link>
        </div>
        <div
          style={{
            transform: `translate3d(${disX}px, 0, 0)`
          }}
          className={cs({
            [style.slider]: true
          })}
        />
      </div>
    )
  }
}

export default () => {
  return (
    <SlideContext.Consumer>
      {({ pos, pageIndex }) => (
        <BaseHeaderBar component={SlideNav} style={style.headerBar} pos={pos} pageIndex={pageIndex} />
      )}
    </SlideContext.Consumer>
  )
}
