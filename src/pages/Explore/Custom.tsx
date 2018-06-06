import * as React from 'react'
import * as style from './style.scss'
import Model from '@/utils/FetchComponent/model'
import RecommendList from './RecommendList'
import Banner from './Banner'

interface IbannerStore{
  banner?: any;
  payload?: any;
  fetchData?: any;
  banners?: any;
}

const bannerStore: IbannerStore = new Model({ URL: '/banner' })
const listStore: IbannerStore = new Model({ URL: '/personalized' })
const songStore: IbannerStore = new Model({ URL: '/personalized/newsong' })

const listNormalizer = (result) => (result.map(item => ({
  id: item.id,
  picUrl: item.picUrl,
  playCount: item.playCount,
  name: item.name
})))

const songNormalizer = (result) => (result.map(item => ({
  id: item.song.id,
  picUrl: item.song.album.picUrl,
  playCount: null,
  name: item.name
})))

export default class Custom extends React.Component<any> {

  public banner: any;

  public componentDidMount() {

    this.banner.addEventListener('touchmove', (e) => {
      e.stopPropagation()

    })

    bannerStore.fetchData()
    listStore.fetchData()
    songStore.fetchData()
  }

  public render() {
    return (
      <div className={style.custom}>
        <div className={style.banners} ref={ref => { this.banner = ref }}>
          <Banner store={bannerStore} />
        </div>
        <RecommendList store={listStore} normalizer={listNormalizer} title="推荐歌单" />
        <RecommendList store={songStore} normalizer={songNormalizer} title="最新音乐" />
      </div>
    )
  }
}