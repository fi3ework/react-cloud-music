import * as React from 'react'
import * as cs from 'classnames'
import * as style from './style.scss'
import { withRouter } from 'react-router-dom'
import Custom from './Custom'
import Model from '@/utils/FetchComponent/model'

const store = new Model({ URL: '/banner' })

interface IProps{
  location: { pathname: string };
}

class Explore extends React.Component<IProps> {

  public componentDidMount() {
    store.fetchData()
  }

  public componentDidUpdate(prevProps, prevState) {
    console.log(this.props)
  }

  public render() {
    const wrapperClass = cs({
      [style.wrapper]: true,
      [style.showCustom]: this.props.location.pathname === '/explore/custom',
      [style.showDj]: this.props.location.pathname === '/explore/dj',
    })

    return (
      <div className={wrapperClass}>
        <div className={style.innerWrapper}>
          <Custom store={store} />
        </div>
        <div className={style.innerWrapper}>
          <div className={style.dj}>
          2
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Explore)
