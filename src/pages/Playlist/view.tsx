import * as React from 'react'
import * as style from './style.scss'
import { calcPlayCount } from '@/utils/calcFunctions'
import { ComponentFetchModel } from '@/utils/models'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import TrackList from '@/components/TrackList'
import NETEASE_API, { getURL } from '@/constant/api'
import Header from './Header'

type IProps = {
  style?: React.CSSProperties
  location?: any
  match?: any
}

@observer
class Playlist extends React.Component<IProps> {
  listStore = new ComponentFetchModel({
    URL: getURL(NETEASE_API.playlist, { id: this.props.match.params.id })
  })

  componentDidMount() {
    this.listStore.fetchData()
  }

  render() {
    const locationState = this.props.location.state || {}
    const { playCount, picUrl, name } = locationState
    const coverImg = get(this.listStore, 'payload.result.coverImgUrl')
    return (
      <div className={style.wrapper}>
        <div className={style.foreground}>
          <Header bgImgUrl={coverImg} />
          <div className={style.infoWrapper}>
            <div className={style.coverWrapper}>
              <img src={picUrl} />
              <p className={style.playCount}>{calcPlayCount(playCount)}</p>
            </div>
            <h1 className={style.listName}>{name}</h1>
          </div>
          <div className={'songList'}>
            <TrackList payload={this.listStore.payload} />
          </div>
        </div>
        <div className={style.bgImg} style={{ backgroundImage: `url(${coverImg})` }} />
      </div>
    )
  }
}

export default Playlist
