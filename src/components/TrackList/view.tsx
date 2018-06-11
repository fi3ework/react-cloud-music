import * as React from 'react'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import * as style from './style.scss'
import { Link } from 'react-router-dom'
import Store from '@/utils/models/componentFetchModel'

type ITrackListProps = {
  payload: object | null
}

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

const Track: React.SFC<ITrackProps> = ({ name, artists, album, index }) => {
  return (
    <Link to={`/playing/`} className={style.trackWrapper}>
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

const Bar: React.SFC<{ tracksCount: number }> = ({ tracksCount }) => {
  return <div className={style.bar}>{`播放全部（共${tracksCount}首）`}</div>
}

@observer
export default class TrackList extends React.Component<ITrackListProps> {
  public calcTracks = store => {
    const tracks = get(store, 'result.tracks')
    if (!tracks) {
      return null
    } else {
      return tracks.map((item, index) => {
        return (
          <Track
            key={item.id}
            name={item.name}
            artists={item.artists}
            album={item.album}
            index={index}
            id={item.id}
          />
        )
      })
    }
  }

  public render() {
    const tracks = this.calcTracks(this.props.payload)
    return (
      <div>
        {tracks ? (
          <React.Fragment>
            <Bar tracksCount={tracks.length} />
            <div>{tracks}</div>
          </React.Fragment>
        ) : (
          <div className={style.loading} />
        )}
      </div>
    )
  }
}
