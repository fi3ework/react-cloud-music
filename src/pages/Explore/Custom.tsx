import * as React from 'react'
import * as style from './style.scss'
import { ComponentFetchModel } from '@/utils/models'
import RecommendList from './RecommendList'
import Banner from './Banner'
import NETEASE_API, { getAPI } from '../../constant/api'

const bannerStore: ComponentFetchModel = new ComponentFetchModel({ URL: getAPI(NETEASE_API.banner) })
const listStore: ComponentFetchModel = new ComponentFetchModel({ URL: getAPI(NETEASE_API.recommendList) })
const songStore: ComponentFetchModel = new ComponentFetchModel({ URL: getAPI(NETEASE_API.recommendSong) })

const listNormalizer = result =>
  result.map(item => ({
    id: item.id,
    picUrl: item.picUrl,
    playCount: item.playCount,
    name: item.name,
    path: `/playlist/${item.id}`
  }))

const songNormalizer = result =>
  result.map(item => ({
    id: item.song.id,
    picUrl: item.song.album.picUrl,
    playCount: null,
    name: item.name,
    path: `/playlist/${item.id}`
  }))

export default class Custom extends React.Component<any> {
  banner: HTMLDivElement | null
  componentDidMount() {
    if (this.banner) {
      this.banner.addEventListener('touchmove', e => {
        e.stopPropagation()
      })
    }

    bannerStore.fetchData()
    listStore.fetchData()
    songStore.fetchData()
  }

  render() {
    return (
      <div className={style.custom}>
        <div className={style.redBg} />
        <div
          className={style.banners}
          ref={ref => {
            this.banner = ref
          }}
        >
          <Banner store={bannerStore} />
        </div>
        <RecommendList store={listStore} normalizer={listNormalizer} title="推荐歌单" />
        <RecommendList store={songStore} normalizer={songNormalizer} title="最新音乐" />
      </div>
    )
  }
}
