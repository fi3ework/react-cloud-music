import * as React from 'react'
import * as style from './style.scss'
import { Link } from 'react-router-dom'
import phSVG from './placeholder.svg'
import SVGInline from 'react-svg-inline'
import PropTypes from 'prop-types' // ES6


interface IProps{
  coverImg?: any;
  cols?: number;
  URL?: any;
  playCount?: any;
  listName?: any;
}

class Cover extends React.Component<IProps> {
  public coverImg: any;

  public state = {
    isLoading: true
  }

  public componentDidUpdate(prevProps, prevState) {
    console.log(1111)
    const newImg = new Image()
    newImg.src = this.props.coverImg
    newImg.onload = () => {
      console.log(111)
    }
    newImg.src = this.props.coverImg
  }

  public componentWillUnmount() {
    console.log('unmount')
  }


  public render() {
    console.log('rrr')
    const { coverImg, URL, playCount, listName } = this.props
    const playCountShow = playCount > 10000 ? `${Math.floor(playCount / 10000)}万` : playCount
    return (
      <div className={style.cover}>
        <Link to={URL}>
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