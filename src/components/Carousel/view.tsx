import React from 'react'
import ReactSwipe from 'react-swipe'
import style from './style.scss'

type IProps = {}

type IState = {
  index: number
}


export default class Carousel extends React.Component<IProps, IState> {
  swipe: ReactSwipe | null = null

  state = {
    index: 0
  }

  swipeOpt: SwipeOptions = {
    auto: 5000,
    continuous: false,
    callback: index => {
      this.setState({
        index
      })
    }
  }

  dotClass = index => {
    return this.state.index === index ? 'dot active' : 'dot'
  }

  handleClickDot = index => {
    if (this.swipe !== null) {
      this.swipe.slide(index, 1000)
    }
  }

  render() {
    const children = this.props.children ? (
      this.props.children
    ) : (
      <div className={style.loading} />
    )

    return (
      <div className="swipe-wrapper">
        <ReactSwipe
          key={React.Children.count(this.props.children)}
          swipeOptions={this.swipeOpt}
          ref={ref => {
            this.swipe = ref
          }}
        >
          {children}
        </ReactSwipe>
        <div className="swipe-dots">
          {Array(React.Children.count(this.props.children))
            .fill('ph')
            .map((val, index) => (
              <span
                onClick={() => this.handleClickDot(index)}
                key={index}
                className={this.dotClass(index)}
              />
            ))}
        </div>
      </div>
    )
  }
}
