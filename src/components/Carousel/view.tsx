import * as React from 'react'
import ReactSwipe from 'react-swipe'
import * as style from './style.scss'

export default class Carousel extends React.Component {

  public swipe: any;

  public state = {
    index: 0
  }

  public swipeOpt = {
    continues: false,
    auto: 2222000,
    callback: (index) => {
      this.setState({
        index
      })
    },
  }

  public dotClass = (index) => {
    return this.state.index === index ? 'dot active' : 'dot'
  }

  public handleClickDot = (index) => {
    this.swipe.swipe.slide(index)
  }

  public render() {
    const children = this.props.children ? this.props.children : <div className={style.loading} />

    return (
      <div className="swipper-wrapper">
        <ReactSwipe
          key={React.Children.count(this.props.children)}
          swipeOptions={this.swipeOpt}
          ref={ref => { this.swipe = ref }}
        >
          {children}
        </ReactSwipe>
        <div className="swiper-dots">
          {Array(React.Children.count(this.props.children)).fill('ph').map((val, index) =>
            <span onClick={() => this.handleClickDot(index)} key={index} className={this.dotClass(index)} />
          )}
        </div>
      </div>
    )
  }
}
