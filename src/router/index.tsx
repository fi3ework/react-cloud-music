import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LiveRoute from 'react-live-route'
import ExplorePage from '@/pages/Explore'
import VideoPage from '@/pages/Video'
import MinePage from '@/pages/Mine'
import FriendsPage from '@/pages/Friends'
import AccountPage from '@/pages/Account'
import Playing from '@/pages/Playing'
import Playlist from '@/pages/Playlist'
import BottomBar from '@/layouts/BottomBar'
import BaseHeaderBar from '@/layouts/HeaderBar'
import ExploreHeaderBar from '@/layouts/ExploreHeaderBar'
import * as style from '@/router/routerTrans.scss'
import { SlideContext } from '@/router/slideContext'

const AppRoutes = () => (
  <BrowserRouter>
    <div className={style.rootWrapper}>
      <Switch>
        <Route path={`/explore`} component={ExploreHeaderBar} />
        <Route path={`/video`} component={BaseHeaderBar} />
        <Route path={`/mine`} component={BaseHeaderBar} />
        <Route path={`/friends`} component={BaseHeaderBar} />
        <Route path={`/account`} component={BaseHeaderBar} />
        <Route path={`/`} exact={true} component={ExploreHeaderBar} />
      </Switch>
      <div className={style.routeWrapper}>
        <LiveRoute path={`/`} exact={true} component={ExplorePage} alwaysLive={true} />
        <LiveRoute path={`/explore`} component={ExplorePage} alwaysLive={true} />
        <LiveRoute path={`/video`} component={VideoPage} alwaysLive={true} />
        <LiveRoute path={`/mine`} component={MinePage} alwaysLive={true} />
        <LiveRoute path={`/friends`} component={FriendsPage} alwaysLive={true} />
        <LiveRoute path={`/account`} component={AccountPage} alwaysLive={true} />
        <LiveRoute path={`/playlist/:id`} component={Playlist} name="playlist" livePath={`/playing`} />
        <LiveRoute path={`/playing`} component={Playing} name="playing" alwaysLive={true} />
      </div>
      <Switch>
        <Route path={`/explore`} component={BottomBar} />
        <Route path={`/video`} component={BottomBar} />
        <Route path={`/mine`} component={BottomBar} />
        <Route path={`/friends`} component={BottomBar} />
        <Route path={`/account`} component={BottomBar} />
        <Route path={`/playlist`} component={BottomBar} />
        <Route path={`/`} exact={true} component={BottomBar} />
      </Switch>
    </div>
  </BrowserRouter>
)

class Slider extends React.Component {
  state = { pos: 0, pageIndex: 0 }
  changePos = newPos => {
    this.setState({
      pos: newPos
    })
  }

  setPageIndex = index => {
    this.setState({
      pageIndex: index
    })
  }

  render() {
    return (
      <React.Fragment>
        <SlideContext.Provider
          value={{
            pos: this.state.pos,
            pageIndex: this.state.pageIndex,
            changePos: this.changePos,
            setPageIndex: this.setPageIndex
          }}
        >
          <AppRoutes />
        </SlideContext.Provider>
      </React.Fragment>
    )
  }
}

export default Slider
