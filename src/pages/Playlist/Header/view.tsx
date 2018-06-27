import * as React from 'react'
import * as style from './style.scss'
import { withRouter } from 'react-router'

type IProps = {
  history: any
}

class Header extends React.Component<IProps> {
  goBack: React.MouseEventHandler<HTMLDivElement> = e => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className={style.back}>
        <i className="iconfont-ncm" onClick={this.goBack}>
          &#xe6fb;
        </i>
      </div>
    )
  }
}

export default withRouter(Header)
