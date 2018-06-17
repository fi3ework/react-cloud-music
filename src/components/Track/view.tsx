import * as React from 'react'
import * as style from './style.scss'
import { Link } from 'react-router-dom'

type IArtist = {
  name: string
}

type IAlbum = {
  name: string
}

type ITrackProps = {
  name: string
  artists: IArtist[]
  album: IAlbum
  index: number
  id: string
  play: any
}

export default class Track extends React.Component<ITrackProps> {
  handleClick: React.MouseEventHandler<HTMLLinkElement> = e => {
    this.props.play()
  }

  render() {
    const { name, artists, album, index } = this.props
    return (
      <Link to={`/playing/`} className={style.trackWrapper} onClick={this.handleClick}>
        <div className={style.index}>{index}</div>
        <div className={style.info}>
          <div className={style.songName}>{name}</div>
          <div className={style.album}>
            {artists[0].name} - {album.name}
          </div>
        </div>
      </Link>
    )
  }
}
