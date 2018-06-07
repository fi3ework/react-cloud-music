import * as React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import ExplorePage from '@/pages/Explore'
import VideoPage from '@/pages/Video'
import MinePage from '@/pages/Mine'
import FriendsPage from '@/pages/Friends'
import AccountPage from '@/pages/Account'
import Playing from '@/pages/Playing'
import Playlist from '@/pages/Playlist'
import ButtomBar from '@/layouts/BottomBar'
import BaseHeaderBar from '@/layouts/HeaderBar'
import ExploreHeaderBar from '@/layouts/ExploreHeaderBar'
import * as style from './routerTrans.scss'
import LiverRoute from '@/utils/LiveRoute'

const dynamicRoute = ({ location }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/explore`} component={ExploreHeaderBar} />
        <Route path={`/video`} component={BaseHeaderBar} />
        <Route path={`/mine`} component={BaseHeaderBar} />
        <Route path={`/friends`} component={BaseHeaderBar} />
        <Route path={`/account`} component={BaseHeaderBar} />
        <Route path={`/playing`} component={BaseHeaderBar} />
      </Switch>
      <div className={style.routeWrapper}>
        <LiverRoute path={`/explore`} liveComponent={ExplorePage} />
        <LiverRoute path={`/video`} liveComponent={VideoPage} />
        <LiverRoute path={`/mine`} liveComponent={MinePage} />
        <LiverRoute path={`/friends`} liveComponent={FriendsPage} />
        <LiverRoute path={`/account`} liveComponent={AccountPage} />
        <LiverRoute path={`/playing`} liveComponent={Playing} />
        <Route path={`/playlist/:id`} component={Playlist} />
      </div>
      <ButtomBar />
    </React.Fragment>
  )
}

const Routes = () => (
  <Router>
    <div className={style.rootWrapper}>
      <Route render={dynamicRoute} />
    </div>
  </Router>
)

export default Routes