import * as React from 'react'
import { Carousel, WingBlank } from 'antd-mobile'
import * as style from './style.scss'
import { observer } from 'mobx-react'


@observer
export default class Custom extends React.PureComponent {
  public state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }

  public componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      })
    }, 100)
  }

  public onLoad = () => {
    // fire window resize event to change height
    window.dispatchEvent(new Event('resize'))
    this.setState({ imgHeight: 'auto' })
  }


  public render() {
    return (
      <div className={style.custom}>
        <div className={style.carousel}>
          <WingBlank>
            <Carousel
              autoplay={false}
              infinite={true}
            >
              {this.state.data.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={this.onLoad}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>
        </div>
      </div>
    )
  }
}