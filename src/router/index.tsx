import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LiveRoute } from '../react-live-router/react-router-dom/modules/index.js'
// import LiveRoute from '@/react-live-router/react-router/modules/LiveRoute'
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
import { AnimatedRoute } from 'react-router-transition'

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
        <Route path={`/explore`} component={ExplorePage} />
        <Route path={`/video`} component={VideoPage} />
        <Route path={`/mine`} component={MinePage} />
        <Route path={`/friends`} component={FriendsPage} />
        <Route path={`/account`} component={AccountPage} />
        {/* <AnimatedRoute
          path="/playing"
          component={Playing}
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        /> */}
        <LiveRoute path={`/playing`} component={Playing} name="playing" alwaysLive={true} />
        <LiveRoute path={`/playlist/:id`} component={Playlist} name="playlist" livePath={`/playing`} />
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
