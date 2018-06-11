import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
// import Carousel from '@/components/Carousel'

interface IProps {
  store: any
}

@observer
export default class Custom extends React.Component<IProps, any> {
  public render() {
    return (
      <div className={style.custom}>
        {/* <div className="swipe-wrapper"> */}
        <div className={style.banners}>234234</div>
        {/* </div> */}
        {/* <Matrix /> */}
      </div>
    )
  }
}
