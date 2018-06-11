import React from 'react'
import style from './style.scss'
import { Link } from 'react-router-dom'
import phSVG from './placeholder.svg'
import SVGInline from 'react-svg-inline'
import { calcPlayCount } from '@/utils/calcFunctions'

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
          {coverImg ? <p className={style.listName}>{listName}</p> : null}
          {coverImg ? <p className={style.playCount}>{playCountShow}</p> : null}
        </Link>
      </div>
    )
  }
}

export default Cover
