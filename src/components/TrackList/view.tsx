import * as React from 'react'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import * as style from './style.scss'
import Track from '@/components/Track'
import cs from 'classnames'
import PropTypes from 'prop-types'

type ITrackListProps = {
  payload: object | null
}

class Bar extends React.Component<{ tracksCount: number }> {
  static contextTypes = {
    store: PropTypes.object
  }

  handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    this.context.store.dispatch({})
  }

  render() {
    return (
      <div className={style.bar} onClick={this.handleClick}>
        <i className={cs({ 'iconfont-ncm': true, [style.playAllIcon]: true })}>&#xe641;</i>
        {`播放全部（共${this.props.tracksCount}首）`}
      </div>
    )
  }
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
          <Track key={item.id} name={item.name} artists={item.artists} album={item.album} index={index + 1} id={item.id} />
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
