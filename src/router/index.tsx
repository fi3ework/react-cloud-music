import * as React from 'react'
import { BrowserRouter, Route, Switch } from '../react-live-router/react-router-dom/modules/index.js'
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
import * as style from './routerTrans.scss'
import LiverRoute from '@/utils/LiveRoute'
// import { AnimatedRoute } from 'react-router-transition'

const dynamicRoute = ({ location }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={`/explore`} component={ExploreHeaderBar} />
        <Route path={`/video`} component={BaseHeaderBar} />
        <Route path={`/mine`} component={BaseHeaderBar} />
        <Route path={`/friends`} component={BaseHeaderBar} />
        <Route path={`/account`} component={BaseHeaderBar} />
      </Switch>
      <div className={style.routeWrapper}>
        <LiverRoute path={`/explore`} liveComponent={ExplorePage} />
        <Route path={`/video`} component={VideoPage} />
        <Route path={`/mine`} component={MinePage} />
        <LiverRoute path={`/friends`} liveComponent={FriendsPage} />
        <Route path={`/account`} component={AccountPage} />
        {/* <AnimatedRoute
          path="/playing"
          component={Playing}
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        /> */}
        <LiverRoute path={`/playing`} floatComponent={Playing} />
        <Route path={`/playlist/:id`} component={Playlist} />
      </div>
      <Switch>
        <Route path={`/explore`} component={BottomBar} />
        <Route path={`/video`} component={BottomBar} />
        <Route path={`/mine`} component={BottomBar} />
        <Route path={`/friends`} component={BottomBar} />
        <Route path={`/account`} component={BottomBar} />
        <Route path={`/playlist`} component={BottomBar} />
      </Switch>
    </React.Fragment>
  )
}

const Routes = () => (
  <BrowserRouter>
    <div className={style.rootWrapper}>
      <Route render={dynamicRoute} />
    </div>
  </BrowserRouter>
)

export default Routes
