import React from 'react'
import * as style from './style.scss'

type IProps = {
  artists: string
  album: string
}

export default class RotatingCover extends React.Component<IProps> {
  render() {
    return (
      <div>
        <div>{this.props.artists}</div>
        <div>{this.props.album}</div>
      </div>
    )
  }
}
