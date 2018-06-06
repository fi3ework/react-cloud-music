import * as React from 'react'
import * as cs from 'classnames'
import * as style from './style.scss'
import { withRouter } from 'react-router-dom'
import Custom from './Custom'
import { transform } from 'typescript'

interface IProps{
  location: { pathname: string };
}

class Explore extends React.Component<IProps> {
  public pageWrapper: any;

  public state = {
    touchStartPos: { x: 0, y: 0 },
    swipedDisX: 0,
    isVerticalScrolling: null,
    prevOffsetX: 0,
  }

  public componentDidMount() {
    console.log('explore mount')
    this.pageWrapper.addEventListener('touchstart', this.handleTouchStart)
    this.pageWrapper.addEventListener('touchmove', this.handleTouchMove)
    this.pageWrapper.addEventListener('touchend', this.handleTouchEnd)
  }

  public handleTouchStart = (e) => {
    console.log('===== start =====')
    console.log(this.state.isVerticalScrolling)
    if (e.touches.length === 1) {
      this.setState({
        prevOffsetX: this.state.prevOffsetX + this.state.swipedDisX,
        touchStartPos: { x: e.touches[0].screenX, y: e.touches[0].screenY },
        swipedDisX: 0
      })
    }
  }

  public handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      // measure change in x and y
      const delta = {
        x: touch.screenX - this.state.touchStartPos.x,
        y: touch.screenY - this.state.touchStartPos.y
      }
      // determine if scrolling test has run - one time test
      if (this.state.isVerticalScrolling === null) {
        console.log('===== reset =====')
        this.setState({
          isVerticalScrolling: !!(Math.abs(delta.x) < Math.abs(delta.y))
        })
      }

      if (!this.state.isVerticalScrolling) {
        e.preventDefault()
        const currSwipedXDis = e.touches[0].screenX - this.state.touchStartPos.x
        this.setState({
          swipedDisX: currSwipedXDis,
        })
      }
    }
  }

  public handleTouchEnd = (e) => {
    console.log('===== end =====')
    console.log(e)
    this.setState({
      // prevEndingPos: { x: this.state.currPos.x },
      // prevOffset: { x: this.state.currPos.x },
      isVerticalScrolling: null
    })
  }

  public render() {
    const wrapperClass = cs({
      [style.exploreWrapper]: true,
      [style.showCustom]: this.props.location.pathname === '/explore/custom',
      [style.showDj]: this.props.location.pathname === '/explore/dj',
    })

    return (
      <div
        className={wrapperClass}
        ref={ref => { this.pageWrapper = ref }}
        style={{ transform: `translate3d(${this.state.prevOffsetX + this.state.swipedDisX}px, 0, 0)` }}
      >
        <div className={style.innerWrapper}>
          <Custom />
        </div>
        <div className={style.innerWrapper} >
          <div className={style.dj}>
          2
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Explore)
