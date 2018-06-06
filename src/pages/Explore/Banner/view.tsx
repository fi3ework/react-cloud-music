import Carousel from '@/components/Carousel'
import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'


export default observer(({ store }) => {
  return (
    <Carousel>
      {
        store.payload ?
          store.payload.banners.map(banner => {
            return (
              <div key={banner.url} className={style.slideItem}>
                <img className={style.slideImg} src={banner.picUrl} />
              </div>
            )
          }) : null
      }
    </Carousel >
  )
})