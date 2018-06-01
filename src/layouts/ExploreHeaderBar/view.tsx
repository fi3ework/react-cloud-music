import * as React from 'react'
import BaseHeaderBar from '../HeaderBar'
import * as style from './style.scss'
import { Link } from 'react-router-dom'
import cs from 'classnames'

class SlideNav2 extends React.Component {

  public state = {
    index: 0
  }

  public changePage =(index) => {
    this.setState({
      index
    })
  }

  public render() {
    return (
      <div className={style.wrapper}>
        <div className={style.slideNav}>
          <Link to="/explore/custom" onClick={() => this.changePage(0)}>个性推荐</Link>
          <Link to="/explore/dj" onClick={() => this.changePage(1)}>主播电台</Link>
        </div>
        <div className={cs({
          [style.slider]: true,
          [style.index0]: this.state.index === 0,
          [style.index1]: this.state.index === 1
        })}
        />
      </div>
    )
  }
}

export default () => {
  return <BaseHeaderBar component={SlideNav2} />
}

