import * as React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import ExplorePage from '@/pages/Explore'
import VideoPage from '@/pages/Video'
import MinePage from '@/pages/Mine'
import FriendsPage from '@/pages/Friends'
import AccountPage from '@/pages/Account'
import Playing from '@/pages/Playing'
import ButtomBar from '@/layouts/BottomBar'
import HeaderBar from '@/layouts/HeaderBar'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import * as style from './routerTrans.scss'
const dynamicRoute = ({ location }) => {
  return (
    <React.Fragment>
      <HeaderBar />
      <div className={style.routeWrapper}>
        {/* <TransitionGroup> */}
        {/* <CSSTransition key={location.pathname} classNames="slide" timeout={{ enter: 2000, exit: 2000 }}> */}
        <Switch>
          <Route path={`/explore`} component={ExplorePage} />
          <Route path={`/video`} component={VideoPage} />
          <Route path={`/mine`} component={MinePage} />
          <Route path={`/friends`} component={FriendsPage} />
          <Route path={`/account`} component={AccountPage} />
          <Route path="/playing" component={Playing} />
        </Switch>
        {/* </CSSTransition> */}
        {/* </TransitionGroup> */}
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