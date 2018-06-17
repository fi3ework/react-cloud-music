import React from 'react'
import style from './style.scss'

type IProps = {
  artists: string
  name: string
}

export default class RotatingCover extends React.Component<IProps> {
  render() {
    return (
      <div className={style.headerWrapper}>
        <div className={style.songName}>{this.props.name}</div>
        <div className={style.artists}>{this.props.artists}</div>
      </div>
    )
  }
}
