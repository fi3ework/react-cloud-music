import * as React from 'react'
import * as style from './style.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import {
  IStoreState,
  IPlayingSong,
  IPlayState,
  SwitchSongByPace,
  fetchSongUrl,
  CHANGE_PLAYLIST_INDEX
} from '../../store'
import RotatingCover from './RotatingCover'
import Header from './HeaderBar'
import ControlBar from './ControlBar'
import PropTypes from 'prop-types'

interface IProps {
  style: React.CSSProperties
  playState: IPlayState
  playingSong: IPlayingSong
}

class PlayingPage extends React.Component<IProps> {
  static contextTypes = {
    store: PropTypes.object
  }

  handleSwitchPrevSong = () => {
    this.context.store.dispatch(SwitchSongByPace(-1))
  }

  handleSwitchNextSong = () => {
    this.context.store.dispatch(SwitchSongByPace(1))
  }

  handleSwitchPlayState = () => {
    console.log('!!!')
  }

  render() {
    return (
      <TransitionGroup className="todo-list">
        <CSSTransition key={'v'} timeout={500} classNames="fade">
          <div className={style.wrapper} style={{ ...this.props.style }}>
            <div className={style.foreground}>
              <Header artists={this.props.playingSong.artists} name={this.props.playingSong.name} />
              <RotatingCover playingSong={this.props.playingSong} />
              <ControlBar
                switchPrevSong={this.handleSwitchPrevSong}
                switchNextSong={this.handleSwitchNextSong}
                switchPlayState={this.handleSwitchPlayState}
              />
              <audio src={this.props.playingSong.url} autoPlay={true} />
            </div>
            <div style={{ backgroundImage: `url(${this.props.playingSong.coverImg})` }} className={style.playingBg} />
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

const mapStateToProps = (state: IStoreState, ownProps) => {
  return {
    playState: state.playState,
    playingSong: state.playingSong
  }
}

export default connect<any>(mapStateToProps)(PlayingPage)
