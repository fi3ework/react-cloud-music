import React from 'react'
import * as style from './style.scss'
import { IPlayingSong, IPlayState } from '../../../store'

type IProps = {
  playingSong: IPlayingSong
}

export default class RotatingCover extends React.Component<IProps> {
  render() {
    return (
      <div>
        <img className={style.coverImg} src={this.props.playingSong.coverImg} />
      </div>
    )
  }
}
