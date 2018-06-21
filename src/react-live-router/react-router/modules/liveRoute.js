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
    isGoingToOnLiveRoute: PropTypes.string.isRequired
    // registerFloat: PropTypes.func.isRequired
    // isNextRouteFloat: PropTypes.func.isRequired
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

  keyCanLiveOnCurrLocation = 0
  prevUnmountKey = ''
  componentWillReceiveProps(nextProps, nextContext) {
    console.log('>>> nextProps <<<')
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

    // 1. 当进入一个 onLiveKey 页面的时候，更新 context，通知 Live 组件可以存活
    if (match && nextProps.onLiveKey && nextContext.isGoingToOnLiveRoute.indexOf('@@KEY_') < 0) {
      console.log('000通知进入')
      this.context.setNextOnLiveKey(nextProps.onLiveKey)
    }

    // 2. 当离开一个 onLiveKey 页面的时候，更新 context，通知 Live 组件去死
    if (prevMatch && !match && nextProps.onLiveKey) {
      console.log('000通知离开')
      this.context.setUnmountLiveKey()
    }

    // 2. 确定当前的 liveKey Route 是否可以在当前路由上存活
    this.keyCanLiveOnCurrLocation = 1
    const DO_NOTHING = 0
    const SHOW = 1
    const HIDE = 2
    const UN_MOUNT = 3

    // 进入某 onLiveKey 页，确定 liveKey 页是否可以在当前路由上存活
    // 隐藏存活，动作：隐藏
    if (match && nextProps.liveKey) {
      if (nextContext.isGoingToOnLiveRoute === `@@KEY_${nextProps.liveKey}`) {
        this.keyCanLiveOnCurrLocation = HIDE
      }
    } else if (
      // 触发时机：离开一个 onLiveKey 页面
      !match &&
      nextProps.onLiveKey &&
      nextContext.isGoingToOnLiveRoute.indexOf('@@UM') >= 0 &&
      nextContext.isGoingToOnLiveRoute !== this.prevUnmountKey
    ) {
      console.log('444')
      if (this.prevUnmountKey) {
        this.keyCanLiveOnCurrLocation = UN_MOUNT
      }
      console.log(this.prevUnmountKey)
      console.log(nextContext.isGoingToOnLiveRoute)
      this.prevUnmountKey = nextContext.isGoingToOnLiveRoute
    }

    // 正常存活

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    })
  }

  makeComponentLive = (props, match, componentClass) => {
    console.log('>>> into live component <<<')
    console.log(this.keyCanLiveOnCurrLocation)
    // 销毁
    if (this.keyCanLiveOnCurrLocation === 3) {
      console.log('销毁')
      return null
    }
    // 靠 key 存活
    if (this.keyCanLiveOnCurrLocation === 2) {
      console.log('隐藏')
      this.hideRoute()
    }
    // 正常存活
    if (this.keyCanLiveOnCurrLocation === 1) {
      console.log('显示')
      this.showRoute()
    }
    return React.createElement(componentClass, props)
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
