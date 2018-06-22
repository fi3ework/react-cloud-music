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
    _backupRouter: PropTypes.object.isRequired,
    isGoingToOnLiveRoute: PropTypes.bool.isRequired
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
    // this.props.float && this.context.registerFloat(this.props.path)

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
    console.log('didmount')
    this.getDom()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('didupdate')
    this.getDom()
  }

  getDom() {
    let routeDom = ReactDOM.findDOMNode(this)
    this.routeDom = routeDom
    console.log('--- dom got ---')
    console.log(this.routeDom)
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
    console.log(nextProps)
    console.log(this.context)
    console.log(nextContext)
    const prevMatch = this.computeMatch(this.props, this.context.router)
    const match = this.computeMatch(nextProps, nextContext.router)

    // 1. 普通 Route 每次都触发，不会触发顶层 setState
    if (!nextProps.float) {
      console.log('000')
      this.setPending(2)
      this.context.setUnmountLiveKey(this.context.router)
    }

    // 1. 保住 undercover 的路由在等待顶层更新到来前不被卸载
    // this.isPending = false
    // if (prevMatch) {
    //   this.isPending = true
    // }

    // 1. 进入 Float Route 时触发浮动，触发顶层 setState
    if (match && nextProps.float && !nextContext.isGoingToOnLiveRoute) {
      console.log('111')
      this.setPending(2)
      nextContext.setNextOnLiveKey(true)
    }

    // 1.5 确定 pending 状态：如果当前页匹配 && 下一页是 float 页
    // if (prevMatch && this.context.isNextRouteFloat()) {
    //   this.isPending = true
    // }

    // 进入普通 Route 退出清除浮动，触发顶层 setState
    // if (match && !nextProps.float && nextContext.isGoingToOnLiveRoute) {
    //   console.log('444')
    //   nextContext.setNextOnLiveKey(false)
    // }

    // 2. 计算 still match
    let undercoverMatch
    if (nextContext.isGoingToOnLiveRoute) {
      undercoverMatch = this.computeMatch(nextProps, nextContext._backupRouter)
    }
    // if (undercoverMatch) {
    //   this.isPending = false
    // }

    console.log(this.computeMatch(nextProps, nextContext.router))
    this.setState({
      match: this.computeMatch(nextProps, nextContext.router) || undercoverMatch
      // isUnderFloat: undercoverMatch
    })
  }

  // isPending = false

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   console.log('should component update' + this.isPending)
  //   if (this.isPending) {
  //     return false
  //   }
  //   return true

  makeComponentLive = (props, match, componentClass) => {
    console.log('>>> into live component <<<')
    if (match) {
      this.showRoute()
    } else {
      this.hideRoute()
    }
    return React.createElement(componentClass, props)
    // const oriComponent = React.createElement(componentClass, props)
    // const displayStyle = match
    //   ? {}
    //   : {
    //       position: 'absolute',
    //       display: 'none',
    //       visibility: 'hidden',
    //       top: '99999px',
    //       left: '99999px',
    //       zIndex: '-999999'
    //     }
    // return React.cloneElement(oriComponent, {
    //   style: displayStyle
    // })
  }

  componentInited = false

  render() {
    const { match } = this.state
    const { children, component, render, liveComponent, live, float } = this.props
    const { history, route, staticContext } = this.context.router
    const location = this.props.location || route.location
    const props = { match, location, history, staticContext }

    // live

    if (match) {
      this.componentInited = true
      // this.getDom()
    }

    if (this.componentInited && live) {
      return this.makeComponentLive(props, match, component)
    }

    console.log('---match0---' + this.props.name)
    console.log(match)
    if (component) return match ? React.createElement(component, props) : null

    if (render) return match ? render(props) : null

    if (typeof children === 'function') return children(props)

    if (children && !isEmptyChildren(children)) return React.Children.only(children)

    return null
  }
}

export default Route
