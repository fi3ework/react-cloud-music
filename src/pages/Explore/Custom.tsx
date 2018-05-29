import * as React from 'react'
import { Carousel, WingBlank } from 'antd-mobile'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import Matrix from '@/components/Matrix'

interface IProps{
  store: any;
}

@observer
export default class Custom extends React.Component<IProps, any> {
  public render() {
    return (
      <div className={style.custom}>
        <div className={style.carousel}>
          <WingBlank>
            <Carousel
              autoplay={false}
              infinite={true}
            >
              {this.props.store.payload && this.props.store.payload.banners.map(banner => (
                <a
                  key={banner.url}
                  href={banner.url}
                  style={{ display: 'inline-block', borderRadius: '5px', width: '100%', height: 170 }}
                >
                  <img src={banner.picUrl} style={{ width: '100%', height: '100%' }} />
                </a>
              ))}
            </Carousel>
          </WingBlank>
        </div>
        <Matrix />
      </div>
    )
  }
}