import React from 'react'
import style from './style.scss'
import { Link } from 'react-router-dom'
import phSVG from './placeholder.svg'
import SVGInline from 'react-svg-inline'
import { calcPlayCount } from '@/utils/calcFunctions'
import cs from 'classnames'

type IProps = {
  coverImg: string
  listName: string
  path: string
  playCount?: number
  id?: string
}

type IState = {
  isLoading: boolean
}

class Cover extends React.Component<IProps, IState> {
  coverImg: HTMLImageElement | null
  state = {
    isLoading: true
  }

  componentDidUpdate() {
    if (this.state.isLoading === true) {
      const newImg = new Image()
      newImg.onload = () => {
        this.setState({
          isLoading: false
        })
      }
      if (this.props.coverImg) {
        newImg.src = this.props.coverImg
      }
    }
  }

  render() {
    const { coverImg, path, playCount, listName } = this.props
    const playCountShow = calcPlayCount(playCount)
    return (
      <div className={style.cover}>
        <Link
          className={style.linkWrapper}
          to={{
            pathname: path,
            state: {
              picUrl: coverImg,
              name: listName,
              playCount
            }
          }}
        >
          {this.state.isLoading ? (
            <SVGInline component={'span'} svg={phSVG} />
          ) : (
            <img
              src={coverImg}
              className={style.coverImg}
              ref={ref => {
                this.coverImg = ref
              }}
            />
          )}
          {coverImg ? (
            <React.Fragment>
              <p className={style.listName}>{listName}</p>
              <div className={style.playCountWrapper}>
                <i className={cs({ 'iconfont-ncm': true, [style.playCountIcon]: true })}>&#xe645;</i>
                <span>{playCountShow}</span>
              </div>
            </React.Fragment>
          ) : null}
        </Link>
      </div>
    )
  }
}

export default Cover
