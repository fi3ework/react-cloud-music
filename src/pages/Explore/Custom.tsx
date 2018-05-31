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
const listStore = new Model({ URL: '/personalized' })

export default class Custom extends React.Component<any> {

  public componentDidMount() {
    bannerStore.fetchData()
    listStore.fetchData()
  }

  public render() {
    return (
      <div className={style.custom}>
        <div className={style.banners}>
          <Banner store={bannerStore} />
        </div>
        <RecommendList store={listStore} items={[1, 2, 3, 4, 5, 6, 7]} cols={4} />
      </div>
    )
  }
}