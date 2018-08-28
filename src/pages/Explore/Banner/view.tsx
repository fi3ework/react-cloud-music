import Carousel from '@/components/Carousel'
import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import Store from '@/utils/models/componentFetchModel'
import { get } from 'lodash'

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

type IState = {
  isImgsLoaded: boolean
}

@observer
class Banner extends React.Component<IProps, any> {
  state = {
    isInited: false,
    isImgsLoaded: false
  }

  componentDidMount() {
    this.isImgsLoadComplete(get(this.props, 'store.payload.banners'))
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isInited) {
      this.isImgsLoadComplete(get(this.props, 'store.payload.banners'))
    }
  }

  isImgsLoadComplete = urls => {
    const length = get(urls, 'length')
    if (!length) {
      return
    }

    const totalImgCount = length
    let loadedImgCount = 0
    urls.forEach(img => {
      const testImg = new Image()
      testImg.src = img.picUrl
      testImg.onload = () => {
        loadedImgCount++
        if (loadedImgCount === totalImgCount) {
          this.setState({
            isImgsLoaded: true,
            isInited: true
          })
        }
      }
    })
  }

  render() {
    const payload = this.props.store.payload as IBannerPayload
    return (
      <Carousel>
        {payload && this.state.isImgsLoaded
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
}

export default Banner
