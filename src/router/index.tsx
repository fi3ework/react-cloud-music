import * as React from 'react'
import { BrowserRouter, Route, LiveRoute, Switch } from '../react-live-router/react-router-dom/modules/index.js'
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
// import { AnimatedRoute } from 'react-router-transition'

const dynamicRoute = ({ location }) => {
  return (
    <React.Fragment>
      <Switch>
        {/* <LiveRoute path={`/explore`} component={ExploreHeaderBar} /> */}
        {/* <LiveRoute path={`/video`} component={BaseHeaderBar} /> */}
        {/* <LiveRoute path={`/mine`} component={BaseHeaderBar} /> */}
        {/* <LiveRoute path={`/friends`} component={BaseHeaderBar} /> */}
        {/* <LiveRoute path={`/account`} component={BaseHeaderBar} /> */}
      </Switch>
      <div className={style.routeWrapper}>
        <LiveRoute path={`/explore`} component={ExplorePage} />
        {/* <LiveRoute path={`/video`} component={VideoPage} /> */}
        {/* <LiveRoute path={`/mine`} component={MinePage} /> */}
        {/* <LiveRoute path={`/friends`} component={FriendsPage} live={true} /> */}
        {/* <LiveRoute path={`/account`} component={AccountPage} /> */}
        {/* <AnimatedRoute
          path="/playing"
          component={Playing}
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
        /> */}
        <LiveRoute path={`/playing`} component={Playing} name="playing" />
        <LiveRoute path={`/playlist/:id`} component={Playlist} live={true} name="playlist" />
      </div>
      <Switch>
        {/* <LiveRoute path={`/explore`} component={BottomBar} /> */}
        {/* <LiveRoute path={`/video`} component={BottomBar} /> */}
        {/* <LiveRoute path={`/mine`} component={BottomBar} /> */}
        {/* <LiveRoute path={`/friends`} component={BottomBar} /> */}
        {/* <LiveRoute path={`/account`} component={BottomBar} /> */}
        {/* <LiveRoute path={`/playlist`} component={BottomBar} /> */}
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
