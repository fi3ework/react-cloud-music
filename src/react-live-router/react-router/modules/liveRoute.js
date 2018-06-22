import warning from 'warning'
import invariant from 'invariant'
import React from 'react'
import PropTypes from 'prop-types'
import matchPath from './matchPath'
import ReactDOM from 'react-dom'

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
    })
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
    match: this.computeMatch(this.props, this.context.router)
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
    this.plog('into cwrp')
    warning(
      !(nextProps.location && !this.props.location),
      '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    )

    warning(
      !(!nextProps.location && this.props.location),
      '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    )

    const match = this.computeMatch(nextProps, nextContext.router)
    const prevMatch = this.computeMatch(this.props, this.context.router)
    if (this.props.livePath) {
      this.plog('进入专属')
      const livePath = nextProps.livePath
      const nextPropsWithLivePath = { ...nextProps, path: livePath }
      const livePathMatch = this.computeMatch(nextPropsWithLivePath, nextContext.router)
      if (match) {
        console.log('--- 0 ---')
        this.liveState = 0
        // 正常存活
        this.setState({
          match: this.computeMatch(nextProps, nextContext.router)
        })
        console.log('存储的 _prevRouter')
        this._prevRouter = this.context.router
      } else if (livePathMatch) {
        // 备份一下需要渲染的参数
        console.log('--- 1 ---')
        this.liveState = 1
        this._prevProps = this.props
        console.log('存储的 _prevProps')
        console.log(this._prevProps)
        this.setState({
          match: prevMatch
        })
      }

      return
    }

    this.setState({
      match
    })
  }

  plog = text => {
    const that = this
    if (that.props.name === 'playlist') {
      console.log(text)
    }
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

  // makeComponentLive = (state, props, match, component) => {
  //   this.plog('>>> into live component <<<')
  //   // 隐藏
  //   if (this.state === 0) {
  //     this.plog('>>> 正常')
  //     return match ? React.createElement(component, props) : null
  //   }
  //   if (this.state === 1) {
  //     this.plog('>>> 隐藏')
  //     this.hideRoute()
  //   }
  //   return React.createElement(component, this._prevProps)
  // }

  render() {
    const { match } = this.state
    const { children, component, render, livePath } = this.props
    const { history, route, staticContext } = this.context.router
    const location = this.props.location || route.location
    const props = { match, location, history, staticContext }

    // 如果已经初始化 && 需要判断是否靠 key 存活
    if (livePath && component) {
      if (this.liveState === 0) {
        return match ? React.createElement(component, props) : null
      } else if (this.liveState === 1) {
        console.log('取出的 _prevProps')
        console.log(this._prevProps)
        console.log('取出的 _prevRouter')
        console.log(this._prevRouter)
        const prevRouter = this._prevRouter

        const { history, route, staticContext } = prevRouter
        const location = this.props.location || route.location
        const liveProps = { match, location, history, staticContext }

        return React.createElement(component, liveProps)
      }
    }

    if (component) return match ? React.createElement(component, props) : null

    if (render) return match ? render(props) : null

    if (typeof children === 'function') return children(props)

    if (children && !isEmptyChildren(children)) return React.Children.only(children)

    return null
  }
}

export default Route
