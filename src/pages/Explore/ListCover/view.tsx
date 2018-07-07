import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import { ComponentFetchModel } from '@/utils/models'
import NETEASE_API, { getURL } from '@/constant/api'
import { get } from 'lodash'
import { Link } from 'react-router-dom'

type IProps = {
  store?: any
  listIndex: number
}

type IState = {
  store: any
}

@observer
export default class Custom extends React.Component<IProps, IState> {
  store: any = new ComponentFetchModel({ URL: getURL(NETEASE_API.list, { idx: this.props.listIndex }) })

  componentDidMount() {
    this.store.fetchData()
  }

  render() {
    const coverImgUrl = get(this.store, 'payload.playlist.coverImgUrl')
    const previewItems = get(this.store, 'payload.playlist.tracks')
    const name = get(this.store, 'payload.playlist.name')
    const playCount = get(this.store, 'payload.playlist.playCount')
    const path = `/playlist/${get(this.store, 'payload.playlist.id')}`
    return (
      <Link
        className={style.wrapper}
        to={{
          pathname: path,
          state: {
            picUrl: coverImgUrl,
            name: name,
            playCount
          }
        }}
      >
        <img className={style.coverImg} src={coverImgUrl} />
        <div className={style.previews}>
          {previewItems &&
            previewItems.splice(0, 3).map((track, index) => (
              <div key={index}>
                {index + 1}. {track.name}
              </div>
            ))}
        </div>
      </Link>
    )
  }
}
