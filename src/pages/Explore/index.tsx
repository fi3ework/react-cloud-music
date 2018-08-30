import * as React from 'react'
import * as style from '@/pages/Explore/style.scss'
import Custom from '@/pages/Explore/Custom'
import List from '@/pages/Explore/List'
import Slider from './Slider'
import { SlideContext } from '@/router/slideContext'
import { withRouter } from 'react-router'

interface IProps {
  location: { pathname: string }
  history: any
  style: React.CSSProperties
}

class Explore extends React.Component<IProps> {
  state = { hasRankLoaded: false }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname.split('/').indexOf('rank') >= 0 && !prevState.hasRankLoaded) {
      return { hasRankLoaded: true }
    }
    return null
  }

  setRankLoaded = isLoaded => {
    this.setState({
      hasRankLoaded: isLoaded
    })
  }

  render() {
    return (
      <SlideContext.Consumer>
        {({ changePos, setPageIndex, pageIndex }) => (
          <Slider
            location={this.props.location}
            history={this.props.history}
            setRankLoaded={this.setRankLoaded}
            changePos={changePos}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          >
            <div className={style.innerWrapper}>
              <Custom />
            </div>
            <div className={style.innerWrapper}>{this.state.hasRankLoaded ? <List /> : null}</div>
          </Slider>
        )}
      </SlideContext.Consumer>
    )
  }
}

export default Explore
