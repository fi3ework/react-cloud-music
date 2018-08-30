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
  pageIndex: number
}

class Slider extends React.Component<IProps> {
  pageWrapper: HTMLElement | null

  state = {
    touchStartPos: { x: 0, y: 0 },
    prevOffsetX: 0,
    swipedDisX: 0,
    isVerticalScrolling: null,
    isTransitioning: false
  }

  SWIPE_DIS_THRESH = 80 // 触发翻页生效的最小滑动距离
  PAGE_WIDTH = window.screen.width // 一页的宽度（屏幕宽度）
  PAGE_NUMBER = 2 // 页数
  pageState = {
    DO_NOT_CHANGE: -1 // flag
  }

  componentDidMount() {
    if (this.pageWrapper) {
      this.pageWrapper.addEventListener('touchstart', this.handleTouchStart)
      this.pageWrapper.addEventListener('touchmove', this.handleTouchMove)
      this.pageWrapper.addEventListener('touchend', this.handleTouchEnd)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pageIndex === this.pageState.DO_NOT_CHANGE) {
      return
    }

    if (this.props.pageIndex !== prevProps.pageIndex) {
      this.forceStickScroll(this.props.pageIndex)
    }
  }

  changeRouter = pathName => {
    this.props.history.push(`/explore/${pathName}`)
    if (pathName.includes(`rank`)) {
      this.setState({
        hasRankLoaded: true
      })
      this.props.setRankLoaded(true)
    }
  }

  forceStickScroll = pageIndex => {
    const offset = pageIndex === 1 ? -this.PAGE_WIDTH : 0
    this.setState({
      prevOffsetX: offset,
      swipedDisX: 0,
      isTransitioning: true
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

    // 左滑切换到右侧页
    if (swipedDisX < -this.SWIPE_DIS_THRESH) {
      const nextPage = this.props.pageIndex + 1
      this.setState({
        prevOffsetX: -nextPage * this.PAGE_WIDTH,
        swipedDisX: 0,
        isTransitioning: true
      })
      this.changeRouter('rank')
      return nextPage
    }

    // 右滑切换到左侧页
    if (swipedDisX > this.SWIPE_DIS_THRESH) {
      const nextPage = this.props.pageIndex - 1
      this.setState({
        prevOffsetX: -nextPage * this.PAGE_WIDTH,
        swipedDisX: 0,
        isTransitioning: true
      })
      this.changeRouter('custom')
      return nextPage
    }

    // 不足以切换页回到原页
    this.setState({
      prevOffsetX: -this.props.pageIndex * this.PAGE_WIDTH,
      swipedDisX: 0,
      isTransitioning: true
    })
    return this.props.pageIndex
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
      // 计算 x,y 方向的移动距离
      const delta = {
        x: touch.screenX - this.state.touchStartPos.x,
        y: touch.screenY - this.state.touchStartPos.y
      }
      // 判断是否是垂直滚动
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

        // 阻止滑动到边缘时继续滑动
        if (
          this.state.prevOffsetX + currSwipedXDis > 0 ||
          this.state.prevOffsetX + currSwipedXDis < -(this.PAGE_WIDTH * this.PAGE_NUMBER - 1)
        ) {
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
