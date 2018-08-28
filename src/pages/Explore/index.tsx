import * as React from 'react'
import * as style from '@/pages/Explore/style.scss'
import Custom from '@/pages/Explore/Custom'
import List from '@/pages/Explore/List'
import { Route } from 'react-router-dom'
import Slider from './Slider'
import { SlideContext } from '@/router/slideContext'

interface IProps {
  location: { pathname: string }
  history: any
  style: React.CSSProperties
}

class Explore extends React.Component<IProps> {
  state = { hasRankLoaded: false }
  setRankLoaded = isLoaded => {
    this.setState({
      hasRankLoaded: isLoaded
    })
  }

  render() {
    return (
      <Route>
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
                <Route path={`/`} exact={true} component={Custom} />
                <Route path={`/explore/`} component={Custom} />
              </div>
              <div className={style.innerWrapper}>
                <Route path={this.state.hasRankLoaded ? `/explore` : `/explore/rank`} component={List} />
              </div>
            </Slider>
          )}
        </SlideContext.Consumer>
      </Route>
    )
  }
}

export default Explore
