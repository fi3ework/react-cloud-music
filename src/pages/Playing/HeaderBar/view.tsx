import React, { MouseEventHandler } from 'react'
import style from './style.scss'
import { withRouter } from 'react-router-dom'
type IProps = {
  artists: string
  name: string
  history: any
}

class RotatingCover extends React.Component<IProps> {
  goBack: MouseEventHandler<HTMLDivElement> = e => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className={style.headerWrapper}>
        <div className={style.back} onClick={this.goBack}>
          <i className="iconfont-ncm">&#xe6fb;</i>
        </div>
        <div className={style.songName}>{this.props.name}</div>
        <div className={style.artists}>{this.props.artists}</div>
      </div>
    )
  }
}

export default withRouter(RotatingCover)
