import * as React from 'react'
import BaseHeaderBar from '@/layouts/HeaderBar'
import * as style from '@/layouts/ExploreHeaderBar/style.scss'
import { Link } from 'react-router-dom'
import cs from 'classnames'
import { SlideContext } from '@/router/slideContext'

type IState = {
  index: number
  disX: number
}

type IProps = {
  pageIndex: number
  pos: number
  style: any
  component: any
}

class SlideNav extends React.PureComponent<IProps, IState> {
  INDEX0_POS_X = window.screen.width * (200 / 750)
  INDEX1_POS_X = window.screen.width * (450 / 750)

  state = {
    index: 0,
    disX: this.INDEX0_POS_X
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(`${nextProps.pos} + '   ' + ${nextProps.pageIndex}`)
  //   return null
  // }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   console.log(`== ${this.props.pos} + '   ' + ${nextProps.pos}`)
  //   console.log(`== ${this.props.pageIndex} + '   ' + ${nextProps.pageIndex}`)
  //   if (nextProps.pos !== this.props.pos) {
  //     return true
  //   }

  //   if (nextProps.pageIndex !== this.props.pageIndex) {
  //     return true
  //   }
  //   return false
  // }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.pos)
    // console.log(this.state.disX)
    if (prevProps.pos !== this.props.pos) {
      this.setPos(this.props.pos)
    }

    if (prevProps.pageIndex !== this.props.pageIndex) {
      this.stickScroll(this.props.pageIndex)
    }
  }

  calcPosByPercent: (disXPercent: number) => number = disXPercent => {
    const disX = disXPercent * (this.INDEX1_POS_X - this.INDEX0_POS_X) + this[`INDEX${this.state.index}_POS_X`]
    return disX
  }

  setPos: (pos: number) => void = pos => {
    this.setState({
      disX: this.calcPosByPercent(pos)
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
          style={{
            transform: `translate3d(${this.state.disX}px, 0, 0)`
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
