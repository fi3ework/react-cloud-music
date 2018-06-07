import * as React from 'react'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import * as style from './style.scss'

interface IProps{
  store?: any;
}

const Track = ({ name, artists, album, index }): any => {
  return (
    <div className={style.trackWrapper} >
      <div className={style.index} >
        {index}
      </div>
      <div className={style.info} >
        <div>
          {name}
        </div>
        <div className={style.album} >
          {artists[0].name} - {album.name}
        </div>
      </div>
    </div>
  )
}

const Bar = ({ tracksCount }) => {
  return (
    <div className={style.bar} >{`播放全部（共${tracksCount}首）`}</div>
  )
}

@observer
export default class Tracks extends React.Component<IProps> {

  public calcTracks = (store) => {
    const tracks = get(store, 'result.tracks')
    if (!tracks) {
      return null
    }
    else {
      return tracks.map((item, index) => {
        return <Track key={item.id} name={item.name} artists={item.artists} album={item.album} index={index} />
      })
    }
  }

  public render() {
    const tracks = this.calcTracks(this.props.store)
    return (
      <div>
        {
          tracks ?
            <div>
              <Bar tracksCount={tracks.length} />
              <div>
                {tracks}
              </div>
            </div>
            : <div className={style.loading} />
        }
      </div>
    )
  }
}
