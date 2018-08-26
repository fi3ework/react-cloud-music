import * as React from 'react'
import * as cs from 'classnames'
import * as style from '@/pages/Explore/style.scss'

interface IProps {
  location: { pathname: string }
  history: any
  style?: React.CSSProperties
  setRankLoaded: (isLoaded: boolean) => void
  changePos: (pos: number) => void
  setPageIndex: (index: number) => void
}

class Slider extends React.Component<IProps> {
  pageWrapper: HTMLElement | null

  state = {
    touchStartPos: { x: 0, y: 0 },
    swipedDisX: 0,
    isVerticalScrolling: null,
    prevOffsetX: 0,
    isTransitioning: false,
    hasRankLoaded: false
  }

  SWIPE_DIS_THRESH = 50
  PAGE_WIDTH = window.screen.width
  PAGE_NUMBER = 2

  componentDidMount() {
    if (this.pageWrapper) {
      this.pageWrapper.addEventListener('touchstart', this.handleTouchStart)
      this.pageWrapper.addEventListener('touchmove', this.handleTouchMove)
      this.pageWrapper.addEventListener('touchend', this.handleTouchEnd)
    }
  }

  changeRouter = pathName => {
    this.props.history.push(`/explore/${pathName}`)
    this.setState({
      hasRankLoaded: true
    })
  }

  stickScroll = () => {
    if (this.pageWrapper) {
      this.pageWrapper.addEventListener('transitionend', () => {
        this.setState({
          isTransitioning: false
        })
      })
    }

    const swipedDisX = this.state.swipedDisX
    // 切换页 || 不足以切换页回到原页
    if (swipedDisX < -this.SWIPE_DIS_THRESH || (swipedDisX > 0 && swipedDisX <= this.SWIPE_DIS_THRESH)) {
      this.setState({
        prevOffsetX: -this.PAGE_WIDTH,
        swipedDisX: 0,
        isTransitioning: true
      })
      this.changeRouter('rank')
      this.props.setRankLoaded(true)
      return 1
    }

    // 切换页 || 不足以切换页回到原页
    if (swipedDisX > this.SWIPE_DIS_THRESH || (swipedDisX < 0 && swipedDisX >= -this.SWIPE_DIS_THRESH)) {
      this.setState({
        prevOffsetX: 0,
        swipedDisX: 0,
        isTransitioning: true
      })
      this.changeRouter('custom')
      return 0
    }

    return -1
  }

  handleTouchStart = e => {
    console.log('===== start moving =====')
    if (e.touches.length === 1) {
      this.setState({
        prevOffsetX: this.state.prevOffsetX + this.state.swipedDisX,
        touchStartPos: { x: e.touches[0].screenX, y: e.touches[0].screenY },
        swipedDisX: 0
      })
    }
  }

  handleTouchMove = e => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      // 计算 x y 方向的移动距离
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
        // 模拟滚动
        e.preventDefault()
        const currSwipedXDis = e.touches[0].screenX - this.state.touchStartPos.x

        // 阻止滑动溢出屏幕
        if (this.state.prevOffsetX + currSwipedXDis > 0) {
          this.setState({
            prevOffsetX: 0,
            swipedDisX: 0
          })
          return
        }

        // 阻止滑动溢出屏幕
        if (this.state.prevOffsetX + currSwipedXDis < -this.PAGE_WIDTH) {
          this.setState({
            prevOffsetX: -this.PAGE_WIDTH,
            swipedDisX: 0
          })
          return
        }

        // update
        this.setState({
          swipedDisX: currSwipedXDis
        })
        this.props.changePos(-currSwipedXDis / this.PAGE_WIDTH)
      }
    }
  }

  handleTouchEnd = e => {
    let endIndex
    if (this.state.isVerticalScrolling === false) {
      endIndex = this.stickScroll()
      this.props.setPageIndex(endIndex)
    }
    this.setState({
      isVerticalScrolling: null
    })
  }

  render() {
    const wrapperClass = cs({
      [style.exploreWrapper]: true,
      [style.isTransitioning]: this.state.isTransitioning === true
    })

    return (
      <div
        className={wrapperClass}
        ref={node => {
          this.pageWrapper = node
        }}
        style={{
          transform: `translate3d(${this.state.prevOffsetX + this.state.swipedDisX}px, 0, 0)`,
          ...this.props.style
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Slider
