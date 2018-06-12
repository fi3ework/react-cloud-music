import * as React from 'react'
import * as style from './style.scss'
import { Link } from 'react-router-dom'
import { playSongActionCreator } from '../../store'
import PropTypes from 'prop-types'

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
}

export default class Track extends React.Component<ITrackProps> {
  static contextTypes = {
    store: PropTypes.object
  }

  handleClick: React.MouseEventHandler<HTMLLinkElement> = e => {
    this.context.store.dispatch(playSongActionCreator(this.props.id))
    console.log(this.context.store.getState())
  }

  render() {
    const { name, artists, album, index } = this.props
    return (
      <Link to={`/playing/`} className={style.trackWrapper} onClick={this.handleClick}>
        <div className={style.index}>{index}</div>
        <div className={style.info}>
          <div>{name}</div>
          <div className={style.album}>
            {artists[0].name} - {album.name}
          </div>
        </div>
      </Link>
    )
  }
}
