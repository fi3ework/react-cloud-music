import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import Carousel from '@/components/Carousel'

interface IProps{
  store: any;
}

@observer
export default class Custom extends React.Component<IProps, any> {


  public render() {

    return (
      <div className={style.custom}>
        {/* <div className="swipper-wrapper"> */}
        <Carousel>
          {
            this.props.store.payload &&
              this.props.store.payload.banners.map(banner => {
                return (
                  <div key={banner.url} className={style.slideItem}>
                    <img className={style.slideImg} src={banner.picUrl} />
                  </div>
                )
              })
          }
        </Carousel>
        {/* </div> */}
        {/* <Matrix /> */}
      </div>
    )
  }
}