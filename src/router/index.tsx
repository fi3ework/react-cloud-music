import * as React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import ExplorePage from '@/pages/Explore'
import VideoPage from '@/pages/Video'
import MinePage from '@/pages/Mine'
import FriendsPage from '@/pages/Friends'
import AccountPage from '@/pages/Account'
import Playing from '@/pages/Playing'
import ButtomBar from '@/layouts/BottomBar'
import BaseHeaderBar from '@/layouts/HeaderBar'
import ExploreHeaderBar from '@/layouts/ExploreHeaderBar'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
import * as style from './routerTrans.scss'
import Reviver from '@/utils/Reviver'
const dynamicRoute = ({ location }) => {
  return (
    <React.Fragment>
      {/* <TransitionGroup> */}
      {/* <CSSTransition key={location.pathname} classNames="slide" timeout={{ enter: 2000, exit: 2000 }}> */}
      <Switch>
        <Route path={`/explore`} component={ExploreHeaderBar} />
        <Route path={`/video`} component={BaseHeaderBar} />
        <Route path={`/mine`} component={BaseHeaderBar} />
        <Route path={`/friends`} component={BaseHeaderBar} />
        <Route path={`/account`} component={BaseHeaderBar} />
        <Route path="/playing" component={BaseHeaderBar} />
      </Switch>
      <div className={style.routeWrapper}>
        <Switch>
          <Route path={`/explore`} component={ExplorePage} />
          <Route path={`/video`} component={VideoPage} />
          <Route path={`/mine`} component={MinePage} />
          <Route path={`/friends`} component={FriendsPage} />
          <Route path={`/account`} component={AccountPage} />
          <Route path="/playing" component={Reviver(Playing)} />
        </Switch>
      </div>
      {/* </CSSTransition> */}
      {/* </TransitionGroup> */}
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