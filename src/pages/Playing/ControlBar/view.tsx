import React from 'react'
import * as style from './style.scss'

type IProps = {
  isPlaying: boolean
  switchPrevSong: React.MouseEventHandler<HTMLLIElement>
  switchNextSong: React.MouseEventHandler<HTMLLIElement>
  switchPlayState: React.MouseEventHandler<HTMLLIElement>
}

const RotatingCover: React.SFC<IProps> = props => {
  console.log(props.isPlaying)
  return (
    <div className={style.controlButtonsWrapper}>
      <i onClick={props.switchPrevSong} className={'iconfont-ncm'}>
        &#xe67d;
      </i>
      {props.isPlaying ? (
        <i onClick={props.switchPlayState} className={'iconfont-ncm'}>
          &#xe83b;
        </i>
      ) : (
        <i onClick={props.switchPlayState} className={'iconfont-ncm'}>
          &#xe631;
        </i>
      )}
      <i onClick={props.switchNextSong} className={'iconfont-ncm'}>
        &#xe67e;
      </i>
    </div>
  )
}

export default RotatingCover
