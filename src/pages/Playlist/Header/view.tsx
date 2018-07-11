import * as React from 'react'
import * as style from './style.scss'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cs from 'classnames'

type IProps = {
  history: any
  bgImgUrl: string
}

class Header extends React.Component<IProps> {
  goBack: React.MouseEventHandler<HTMLDivElement> = e => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className={style.headerWrapper}>
        <div className={style.foreground}>
          <div className={style.back}>
            <i
              className={cs({
                'iconfont-ncm': true,
                [style.back]: true
              })}
              onClick={this.goBack}
            >
              &#xe6fb;
            </i>
          </div>
          <Link className={style.playingLink} to="/playing">
            <i className={'iconfont-ncm'}>&#xe6cf;</i>
          </Link>
        </div>
        <div className={style.bgImg} style={{ backgroundImage: `url(${this.props.bgImgUrl})` }} />
      </div>
    )
  }
}

export default withRouter(Header)
