import * as React from 'react'
import * as cs from 'classnames'
import * as style from './style.scss'
import { withRouter } from 'react-router-dom'
import Custom from './Custom'

interface IProps{
  location: { pathname: string };
}

class Explore extends React.PureComponent<IProps> {
  public pageWrapper: any;

  public state = {
    touchStartPos: { x: 0, y: 0 }
  }

  public componentDidMount() {
    console.log('explore mount')
    this.pageWrapper.addEventListener('touchstart', this.recordTouchStartPos)
    this.pageWrapper.addEventListener('touchmove', this.swipePage)
    this.pageWrapper.addEventListener('touchend', this.switchPage)
  }

  public recordTouchStartPos = (e) => {
    if (e.touches.length === 1) {
      this.setState({
        touchStartPos: { x: e.touches[0].screenX, y: e.touches[0].screenY }
      })
    }
  }

  public switchPage = (e) => {
    if (e.touches.length === 1) {
      this.setState({
        touchStartPos: { x: 0, y: 0 }
      })
    }
  }

  public swipePage = (e) => {
    if (e.touches.length === 1) {
      console.log(e.touches[0])
    }
  }

  public render() {
    console.log('rerender')

    const wrapperClass = cs({
      [style.customWrapper]: true,
      [style.showCustom]: this.props.location.pathname === '/explore/custom',
      [style.showDj]: this.props.location.pathname === '/explore/dj',
    })

    return (
      <div className={wrapperClass} ref={ref => { this.pageWrapper = ref }}>
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
