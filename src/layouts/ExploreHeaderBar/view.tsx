import * as React from 'react'
import BaseHeaderBar from '@/layouts/HeaderBar'
import * as style from '@/layouts/ExploreHeaderBar/style.scss'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import { SlideContext } from '@/router/slideContext'

type IState = {
  isGoingToStick: boolean
  prevPos: number
  isMounting: boolean
  pageIndex: number
}

type IProps = {
  component: any
  style: any
  pos: number
  pageIndex: number
  setPageIndex: any
}

class SlideNav extends React.Component<IProps, IState> {
  static defaultProps = {
    pageIndex: 0
  }

  INDEX0_POS_X = window.screen.width * (200 / 750)
  INDEX1_POS_X = window.screen.width * (450 / 750)

  state = {
    prevPos: 0,
    isGoingToStick: true,
    isMounting: true,
    pageIndex: this.props.pageIndex
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      isGoingToStick: nextProps.pos === prevState.prevPos,
      pageIndex: nextProps.pageIndex,
      prevPos: nextProps.pos
    }
  }

  componentDidMount() {
    this.setState({
      isMounting: false
    })
  }

  calcPosByPercent: (disXPercent: number) => number = disXPercent => {
    const disX = disXPercent * (this.INDEX1_POS_X - this.INDEX0_POS_X) + this[`INDEX${this.state.pageIndex}_POS_X`]
    return disX
  }

  changePage = clickedPageIndex => {
    this.props.setPageIndex(clickedPageIndex)
  }

  render() {
    let disX = this.calcPosByPercent(this.props.pos)
    if (this.state.isGoingToStick || this.state.isMounting) {
      disX = this[`INDEX${this.state.pageIndex}_POS_X`]
    }
    return (
      <div className={style.wrapper}>
        <div className={style.slideNav}>
          <Link to="/explore/custom" onClick={() => this.changePage(0)}>
            个性推荐
          </Link>
          <Link to="/explore/rank" onClick={() => this.changePage(1)}>
            排行榜
          </Link>
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
      {({ pos, pageIndex, setPageIndex }) => (
        <BaseHeaderBar
          component={SlideNav}
          style={style.headerBar}
          pos={pos}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      )}
    </SlideContext.Consumer>
  )
}
