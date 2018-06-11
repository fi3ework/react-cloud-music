import * as React from 'react'
import * as cs from 'classnames'
import * as style from './style.scss'
import { withRouter } from 'react-router-dom'
import Custom from './Custom'
import PropTypes from 'prop-types'

interface IProps {
  location: { pathname: string }
  history: any
  style: any
}

class Explore extends React.Component<IProps> {
  public static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }

  public pageWrapper: any

  public state = {
    touchStartPos: { x: 0, y: 0 },
    swipedDisX: 0,
    isVerticalScrolling: null,
    prevOffsetX: 0,
    isTransitioning: false
  }

  public componentDidMount() {
    console.log('explore mount')
    this.pageWrapper.addEventListener('touchstart', this.handleTouchStart)
    this.pageWrapper.addEventListener('touchmove', this.handleTouchMove)
    this.pageWrapper.addEventListener('touchend', this.handleTouchEnd)
  }

  public componentWillUnmount() {
    console.log('=== exlore will unmount ===')
  }

  public changeRouter = pathName => {
    console.log(this.props.history.push(`/explore/${pathName}`))
  }

  public choosePage = () => {
    this.pageWrapper.addEventListener('transitionend', () => {
      this.setState({
        isTransitioning: false
      })
    })

    const swipedDisX = this.state.swipedDisX
    if (swipedDisX < -50 || (swipedDisX > 0 && swipedDisX <= 50)) {
      this.setState({
        prevOffsetX: -375,
        swipedDisX: 0,
        isTransitioning: true
      })
      this.changeRouter('dj')
      console.log(2)
    }

    if (swipedDisX > 50 || (swipedDisX < 0 && swipedDisX >= -50)) {
      this.setState({
        prevOffsetX: 0,
        swipedDisX: 0,
        isTransitioning: true
      })
      this.changeRouter('custom')
      console.log(1)
    }
  }

  public handleTouchStart = e => {
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

  public handleTouchMove = e => {
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
        // prevent overflow the screen

        const currSwipedXDis = e.touches[0].screenX - this.state.touchStartPos.x

        if (this.state.prevOffsetX + currSwipedXDis > 0) {
          this.setState({
            prevOffsetX: 0,
            swipedDisX: 0
          })
          return
        }

        if (this.state.prevOffsetX + currSwipedXDis < -375) {
          this.setState({
            prevOffsetX: -375,
            swipedDisX: 0
          })
          return
        }

        // update current position
        this.setState({
          swipedDisX: currSwipedXDis
        })
      }
    }
  }

  public handleTouchEnd = e => {
    if (this.state.isVerticalScrolling === false) {
      this.choosePage()
    }
    this.setState({
      isVerticalScrolling: null
    })
  }

  public render() {
    const wrapperClass = cs({
      [style.exploreWrapper]: true,
      // [style.showCustom]: this.props.location.pathname === '/explore/custom',
      // [style.showDj]: this.props.location.pathname === '/explore/dj',
      [style.isTransitioning]: this.state.isTransitioning === true
    })

    return (
      <div
        className={wrapperClass}
        ref={ref => {
          this.pageWrapper = ref
        }}
        style={{
          transform: `translate3d(${this.state.prevOffsetX +
            this.state.swipedDisX}px, 0, 0)`,
          ...this.props.style
        }}
      >
        <div className={style.innerWrapper}>
          <Custom />
        </div>
        <div className={style.innerWrapper}>
          <div className={style.dj}>2</div>
        </div>
      </div>
    )
  }
}

export default Explore
