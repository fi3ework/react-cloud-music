import * as React from 'react'
import * as cs from 'classnames'
import * as style from './style.scss'
import { withRouter } from 'react-router-dom'
import Custom from './Custom'

interface IProps{
  location: { pathname: string };
}

class Explore extends React.Component<IProps> {

  public render() {
    const wrapperClass = cs({
      [style.customWrapper]: true,
      [style.showCustom]: this.props.location.pathname === '/explore/custom',
      [style.showDj]: this.props.location.pathname === '/explore/dj',
    })

    return (
      <div className={wrapperClass}>
        <div className={style.innerWrapper}>
          <Custom />
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
