import warning from 'warning'
import invariant from 'invariant'
import React from 'react'
import PropTypes from 'prop-types'
import matchPath from './matchPath'

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
    setPrevContextAndMatch: PropTypes.func.isRequired,
    setGoingToFloatRoute: PropTypes.func.isRequired,
    _backupRouter: PropTypes.object.isRequired,
    isGoingToFloatRoute: PropTypes.bool.isRequired
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
    const match = this.computeMatch(nextProps, nextContext.router)

    // 1. 普通 Route 每次都触发
    if (!nextProps.float) {
      console.log('000')
      const thisPropsMatch = this.computeMatch(this.props, this.context.router)
      nextContext.setPrevContextAndMatch(this.context.router)
    }

    // 1. 进入 Float Route 时触发
    if (match && nextProps.float && !nextContext.isGoingToFloatRoute) {
      console.log('111')
      nextContext.setGoingToFloatRoute(true)
    }

    // 2. 计算 still match
    let stillMatch
    if (nextContext.isGoingToFloatRoute) {
      console.log('222')
      stillMatch = this.computeMatch(nextProps, nextContext._backupRouter)
      if (nextContext.isGoingToFloatRoute && stillMatch) {
        console.log('333')
        console.log(stillMatch)
      }
    }

    console.log('---down')
    console.log(this.computeMatch(nextProps, nextContext.router))
    console.log(stillMatch)
    console.log('---up')
    this.setState({
      match: this.computeMatch(nextProps, nextContext.router) || stillMatch
    })
  }

  makeComponentLive = (props, match, componentClass) => {
    console.log('>>> into live component <<<')
    const oriComponent = React.createElement(componentClass, props)
    // this.componentDisplayName = componentClass.display
    const displayStyle = match
      ? {}
      : {
          visibility: 'hidden',
          position: 'absolute',
          display: 'none',
          zIndex: '-999999'
        }
    return React.cloneElement(oriComponent, {
      style: displayStyle
    })
  }

  makeComponentFloat = () => {}

  render() {
    const { match } = this.state
    const { children, component, render, liveComponent, live, float } = this.props
    const { history, route, staticContext } = this.context.router
    const location = this.props.location || route.location
    const props = { match, location, history, staticContext }

    if (live) {
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
