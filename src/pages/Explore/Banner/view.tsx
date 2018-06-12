import Carousel from '@/components/Carousel'
import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import Store from '@/utils/models/componentFetchModel'

type IBannerItem = {
  url: string
  picUrl: string
}

export type IBannerPayload = {
  code: number
  banners: IBannerItem[]
}

type IProps = {
  store: Store
}

const Banner: React.SFC<IProps> = ({ store }) => {
  const payload = store.payload as IBannerPayload
  return (
    <Carousel>
      {payload
        ? payload.banners.map(banner => {
            return (
              <div key={banner.url} className={style.slideItem}>
                <img className={style.slideImg} src={banner.picUrl} />
              </div>
            )
          })
        : null}
    </Carousel>
  )
}

export default observer(Banner)
