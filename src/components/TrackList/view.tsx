import * as React from 'react'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import * as style from './style.scss'
import Track from '@/components/Track'

type ITrackListProps = {
  payload: object | null
}

const Bar: React.SFC<{ tracksCount: number }> = ({ tracksCount }) => {
  return <div className={style.bar}>{`播放全部（共${tracksCount}首）`}</div>
}

@observer
export default class TrackList extends React.Component<ITrackListProps> {
  calcTracks = store => {
    const tracks = get(store, 'result.tracks')
    if (!tracks) {
      return null
    } else {
      return tracks.map((item, index) => {
        return (
          <Track key={item.id} name={item.name} artists={item.artists} album={item.album} index={index} id={item.id} />
        )
      })
    }
  }

  render() {
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
