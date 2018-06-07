import * as React from 'react'
import * as style from './style.scss'
import { Link } from 'react-router-dom'
import phSVG from './placeholder.svg'
import SVGInline from 'react-svg-inline'
import { calcPalyCount } from '@/utils/calcFucntions'

interface IProps{
  coverImg?: any;
  cols?: number;
  path?: any;
  query?: any;
  playCount?: any;
  id?: any;
  listName?: any;
}

class Cover extends React.Component<IProps> {
  public coverImg: any;

  public state = {
    isLoading: true
  }

  public componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading === true) {
      const newImg = new Image()
      newImg.onload = () => {
        this.setState({
          isLoading: false
        })
      }
      newImg.src = this.props.coverImg
    }
  }

  public render() {
    const { coverImg, path, playCount, listName, id } = this.props
    const playCountShow = calcPalyCount(playCount)
    return (
      <div className={style.cover}>
        <Link
          className={style.linkWrapper}
          to={{
            pathname: path,
            state: {
              picUrl: coverImg,
              name: listName,
              playCount,
            }
          }}
        >
          {
            this.state.isLoading ?
              <SVGInline component={'span'} svg={phSVG} /> :
              <img src={coverImg} className={style.coverImg} ref={ref => { this.coverImg = ref }} />
          }
          {
            coverImg ? <p className={style.listName}>{listName}</p> : null
          }
          {
            coverImg ? <p className={style.playCount}>{playCountShow}</p> : null
          }
        </Link>
      </div>
    )
  }
}

export default Cover