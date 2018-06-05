import * as React from 'react'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
console.log(history)
const stateStore = {}

const getUuid = (key) => {
  return `${history.location.pathname}_${key}`
}

const Reviver = (WrappedComponent, option = {
  key: 'DEFAULT_KEY',
  restoreScrollTop: true
}) => {

  const { key = 'DEFAULT_KEY', restoreScrollTop = true } = option

  class ReviveComponent extends WrappedComponent {

    public static displayName = `Cached Wrapper`;

    public componentDidMount() {
      console.log('Reviver did mount')
      if (super.componentDidMount) {
        super.componentDidMount()
      }

      const uuid = getUuid(key)
      const prevLeavingState = stateStore[uuid]

      if (!prevLeavingState) {
        return
      }

      const { '@@leavingScrollTop': leavingScrollTop, ...componentState } = prevLeavingState
      this.setState({ ...componentState })

      // restore scrollTop
      if (restoreScrollTop) {
        console.log(prevLeavingState)
        window.scrollTo({
          top: leavingScrollTop,
          behavior: 'instant'
        })
      }
    }

    public componentWillUnmount() {
      console.log('Reviver will unmount')
      // record scrollTop
      const leavingScrollTop = window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0)

      console.log(leavingScrollTop)
      // record state
      const leavingState = {
        ...this.state,
        '@@leavingScrollTop': leavingScrollTop
      }

      const uuid = getUuid(key)
      stateStore[uuid] = leavingState
      console.log(stateStore)

      if (super.componentWillUnmount) {
        super.componentWillUnmount()
      }
    }

    public render() {
      console.log('into reviver')
      return (
        super.render()
      )
    }
  }

  return ReviveComponent
}


export default Reviver