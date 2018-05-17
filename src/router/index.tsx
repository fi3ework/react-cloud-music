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
    <div>
      <HeaderBar />
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="slide" timeout={{ enter: 2000, exit: 2000 }}>
          <div className={style.routeWrapper} key={location.pathname}>
            <Switch>
              <Route path={`/explore`} component={ExplorePage} />
              <Route path={`/video`} component={VideoPage} />
              <Route path={`/mine`} component={MinePage} />
              <Route path={`/friends`} component={FriendsPage} />
              <Route path={`/account`} component={AccountPage} />
              <Route path="/playing" component={Playing} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <ButtomBar />
    </div>
  )
}

const Routes = () => (
  <Router>
    <Route render={dynamicRoute} />
  </Router>
)

export default Routes