import warning from 'warning'
import invariant from 'invariant'
import React, { ReactElement, Attributes } from 'react'
import PropTypes from 'prop-types'
import matchPath from '../../node_modules/react-router/matchPath'
import Revivier from './Reviver'

const isEmptyChildren = children => React.Children.count(children) === 0

interface IProps {
  location?: any
  component?: React.ComponentClass
  liveComponent?: any
  render?: (props: any) => React.ReactNode
  children?: (props: any) => React.ReactNode
  path?: any
  style?: React.CSSProperties
  liveRender?: () => React.ReactNode
}

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component<IProps> {
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

  state = {
    match: this.computeMatch(this.props, this.context.router)
  }

  componentDisplayName: any = null

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

  computeMatch({ computedMatch, location, path, strict, exact, sensitive }: any, router) {
    if (computedMatch) {
      return computedMatch
    } // <Switch> already computed the match for us

    invariant(router, 'You should not use <Route> or withRouter() outside a <Router>')

    const { route } = router
    const pathname = (location || route.location).pathname

    return matchPath(pathname, { path, strict, exact, sensitive }, route.match)
  }

  UNSAFE_componentWillMount() {
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

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    warning(
      !(nextProps.location && !this.props.location),
      // tslint:disable:max-line-length
      '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    )

    warning(
      !(!nextProps.location && this.props.location),
      '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    )

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    })
  }

  render() {
    const { match } = this.state
    const { children, component, liveComponent, liveRender, render } = this.props
    const { history, route, staticContext } = this.context.router
    const location = this.props.location || route.location
    const props = { match, location, history, staticContext }

    if (liveComponent) {
      console.log('into live')
      const oriComponent = React.createElement(liveComponent, props)
      this.componentDisplayName = liveComponent.display
      const displayStyle = match
        ? {}
        : {
            visibility: 'hidden',
            position: 'absolute',
            display: 'none',
            zIndex: '-999999'
          }
      return React.cloneElement(oriComponent as ReactElement<any>, {
        style: displayStyle
      })
    }

    if (component) {
      return match ? React.createElement(component, props as Attributes) : null
    }

    if (render) {
      return match ? render(props) : null
    }

    if (typeof children === 'function') {
      return children(props)
    }

    if (children && !isEmptyChildren(children)) {
      return React.Children.only(children)
    }

    return null
  }
}

export default Route
