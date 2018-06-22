import warning from 'warning'
import invariant from 'invariant'
import React from 'react'
import PropTypes from 'prop-types'
import matchPath from './matchPath'
import * as ReactDOM from 'react-dom'

const isEmptyChildren = children => React.Children.count(children) === 0

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component {
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    sensitive: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    location: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    }),
    setUnmountLiveKey: PropTypes.func.isRequired,
    setNextOnLiveKey: PropTypes.func.isRequired,
    isGoingToOnLiveRoute: PropTypes.string.isRequired,
    setPending: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      router: {
        ...this.context.router,
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      }
    }
  }

  state = {
    match: this.computeMatch(this.props, this.context.router),
    previousMatch: false
  }

  computeMatch({ computedMatch, location, path, strict, exact, sensitive }, router) {
    if (computedMatch) return computedMatch // <Switch> already computed the match for us

    invariant(router, 'You should not use <Route> or withRouter() outside a <Router>')

    const { route } = router
    const pathname = (location || route.location).pathname

    return matchPath(pathname, { path, strict, exact, sensitive }, route.match)
  }

  componentWillMount() {
    // 0. 注册所有 float 页面
    // this.props.onLiveKey && this.context.registerFloat(this.props.onLiveKey)

    warning(
      !(this.props.component && this.props.render),
      'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored'
    )

    warning(
      !(this.props.component && this.props.children && !isEmptyChildren(this.props.children)),
      'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored'
    )

    warning(
      !(this.props.render && this.props.children && !isEmptyChildren(this.props.children)),
      'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored'
    )
  }

  componentDidMount() {
    this.getDom()
  }

  componentDidUpdate(prevProps, prevState) {
    this.getDom()
  }

  getDom() {
    let routeDom = ReactDOM.findDOMNode(this)
    this.routeDom = routeDom
  }

  hideRoute() {
    if (this.routeDom) {
      this.routeDom.style.display = 'none'
    }
  }

  showRoute() {
    if (this.routeDom) {
      this.routeDom.style.display = 'block'
    }
  }

  plog = text => {
    const that = this
    if (that.props.name === 'playlist') {
      console.log(text)
    }
  }

  keyCanLiveOnCurrLocation = 0

  isProtected = true
  prevUnmountCount = '@@UM_0'
  prevUnmountKey = () => `@@UM_${this.prevUnmountCount}`

  componentWillReceiveProps(nextProps, nextContext) {
    this.plog('>>> nextProps <<<')
    this.plog(nextContext.isGoingToOnLiveRoute)
    this.plog(this.prevUnmountCount)
    // this.plog('pending: ' + nextContext.isPending)
    warning(
      !(nextProps.location && !this.props.location),
      '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    )

    warning(
      !(!nextProps.location && this.props.location),
      '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    )
    const prevMatch = this.computeMatch(this.props, this.context.router)
    const match = this.computeMatch(nextProps, nextContext.router)

    // 1. 当进入一个 onLiveKey 页面的时候，更新 context，通知对应的 liveKey 组件可以存活
    if (match && nextProps.onLiveKey && nextContext.isGoingToOnLiveRoute.indexOf('@@KEY_') < 0) {
      this.plog('000通知进入onlive')
      this.context.setPending(2)
      this.context.setNextOnLiveKey(nextProps.onLiveKey)
    }

    // 2. 当离开一个 onLiveKey 页面的时候，更新 context，++，通知所有 liveKey 组件失去了保护
    if (prevMatch && !match && nextProps.onLiveKey) {
      this.plog('000通知离开onlive')
      this.context.setPending(2)
      this.context.setUnmountLiveKey()
    }

    // 2. 确定当前的 liveKey Route 是否可以在当前路由上存活
    // this.keyCanLiveOnCurrLocation = 1
    const NORMAL = 0
    const SHOW1 = 1
    const SHOW2 = 1.1
    const HIDE = 2
    const UN_MOUNT = 3

    // if (!this.isProtected) {
    //   console.error('boooooooooom')
    //   this.setState({
    //     match: this.computeMatch(nextProps, nextContext.router)
    //   })
    //   return
    // }

    // this.isProtected = true

    if (this.props.liveKey) {
      // pending
      if (this.prevUnmountCount === nextContext.isGoingToOnLiveRoute) {
        this.plog('step: ' + this.context.step)
        this.keyCanLiveOnCurrLocation = 1.3
      }
      // 落地，liveKey 隐藏活着
      else if (nextContext.isGoingToOnLiveRoute.indexOf('@@KEY_') === 0) {
        if (match) {
          console.error('normal')
          // 如果是正常的
          this.keyCanLiveOnCurrLocation = NORMAL
        } else {
          // 如果进入了 onLiveKey，则隐藏
          this.keyCanLiveOnCurrLocation = HIDE
        }
      } else if (nextContext.isGoingToOnLiveRoute.indexOf('@@UM_') === 0) {
        // pending && 退出
        // if (nextContext.isGoingToOnLiveRoute !== this.prevUnmountCount) {
        this.keyCanLiveOnCurrLocation = NORMAL
        //
        // this.isProtected = false
        // console.error('you are free')
        // } else {
        // this.keyCanLiveOnCurrLocation = 1.1
      }
    }
    this.prevUnmountCount = nextContext.isGoingToOnLiveRoute
    // }

    // // 触发页面：liveKey 页面
    // // 触发时机：进入一个 liveKey 页面时
    // // 触发动作：判断是否在对应 onLiveKey 上，如果是，则隐藏自己
    // if (match && nextProps.liveKey) {
    //   console.log('111判断进入live')
    //   if (nextContext.isGoingToOnLiveRoute === `@@KEY_${nextProps.liveKey}`) {
    //     this.keyCanLiveOnCurrLocation = HIDE
    //   }
    // }

    // // 触发页面：liveKey 页面
    // // 触发时机：离开一个 liveKey 页面时
    // // 触发动作：判断是否在对应 onLiveKey 上，如果是，则隐藏自己
    // if (prevMatch && !match && nextProps.liveKey) {
    //   console.log('111判断离开live')
    //   console.log(this.prevUnmountKey())
    //   console.log(nextContext.isGoingToOnLiveRoute)
    //   // 什么时候，有保护的更新？
    //   // 就是下一页是对应的 onLiveKey 的时候
    //   if (nextContext.isGoingToOnLiveRoute === `@@KEY_${nextProps.liveKey}`) {
    //     console.log('prev 要被赋值了, prev: ' + this.prevUnmountKey() + ' === ' + nextContext.isGoingToOnLiveRoute)
    //     this.prevUnmountNumber++
    //   }

    //   // 如果 unmountKey 不同，则证明它已经失去了保护
    //   if (
    //     this.prevUnmountKey() !== nextContext.isGoingToOnLiveRoute &&
    //     nextContext.isGoingToOnLiveRoute.indexOf('@@UM') >= 0
    //   ) {
    //     this.keyCanLiveOnCurrLocation = UN_MOUNT
    //     console.warn('hahah')
    //   } else {
    //     this.keyCanLiveOnCurrLocation = HIDE
    //   }
    // }

    // if (this.keyCanLiveOnCurrLocation) {
    // }
    // 正常存活
    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    })
  }

  makeComponentLive = (props, match, component) => {
    this.plog('>>> into live component <<<')
    this.plog(this.keyCanLiveOnCurrLocation)
    // 销毁
    if (this.keyCanLiveOnCurrLocation === 3) {
      this.plog('>>> 销毁')
      return null
    }
    // 靠 key 存活
    if (this.keyCanLiveOnCurrLocation === 2) {
      this.plog('>>> 隐藏')
      this.hideRoute()
    }
    // 正常存活
    if (this.keyCanLiveOnCurrLocation >= 1 && this.keyCanLiveOnCurrLocation < 2) {
      this.plog('>>> 显示 ' + this.keyCanLiveOnCurrLocation)
      this.showRoute()
    }
    if (this.keyCanLiveOnCurrLocation === 0) {
      this.plog('>>> 正常')
      return match ? React.createElement(component, props) : null
    }
    return React.createElement(component, props)
  }

  componentInited = false

  render() {
    const { match } = this.state
    const { children, component, render, liveComponent, liveKey, float } = this.props
    const { history, route, staticContext } = this.context.router
    const location = this.props.location || route.location
    const props = { match, location, history, staticContext }

    // 初始化
    if (match) {
      this.componentInited = true
    }

    // 如果已经初始化 && 需要判断是否靠 key 存活
    if (this.componentInited && liveKey) {
      return this.makeComponentLive(props, match, component)
    }

    if (component) return match ? React.createElement(component, props) : null

    if (render) return match ? render(props) : null

    if (typeof children === 'function') return children(props)

    if (children && !isEmptyChildren(children)) return React.Children.only(children)

    return null
  }
}

export default Route
