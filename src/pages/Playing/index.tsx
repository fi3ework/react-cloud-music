import * as React from 'react'
import * as style from './style.scss'
import { connect } from 'react-redux'
import { IStoreState, IPlayingSong, IPlayState, SwitchSongByPace, switchPlayState } from '../../store'
import RotatingCover from './RotatingCover'
import Header from './HeaderBar'
import ControlBar from './ControlBar'
import PropTypes from 'prop-types'

interface IProps {
  style: React.CSSProperties
  playState: IPlayState
  playingSong: IPlayingSong
}

type IState = {
  isPlaying: boolean
}

class PlayingPage extends React.Component<IProps, IState> {
  static contextTypes = {
    store: PropTypes.object
  }

  audio: HTMLAudioElement | null

  getIsPlaying = () => {
    return this.context.store.getState().playState.isPlaying
  }

  handleSwitchPrevSong = () => {
    this.context.store.dispatch(SwitchSongByPace(-1))
  }

  handleSwitchNextSong = () => {
    this.context.store.dispatch(SwitchSongByPace(1))
  }

  handleSwitchPlayState = () => {
    this.context.store.dispatch(switchPlayState)
    if (this.audio) {
      const isPlaying = this.getIsPlaying()
      if (isPlaying) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    }
  }

  render() {
    return (
      <div className={style.wrapper} style={{ ...this.props.style }}>
        <div className={style.foreground}>
          <Header artists={this.props.playingSong.artists} name={this.props.playingSong.name} />
          <RotatingCover playingSong={this.props.playingSong} />
          <ControlBar
            isPlaying={this.getIsPlaying()}
            switchPrevSong={this.handleSwitchPrevSong}
            switchNextSong={this.handleSwitchNextSong}
            switchPlayState={this.handleSwitchPlayState}
          />
          <audio
            ref={ref => {
              this.audio = ref
            }}
            src={this.props.playingSong.url}
            autoPlay={true}
          />
        </div>
        <div style={{ backgroundImage: `url(${this.props.playingSong.coverImg})` }} className={style.playingBg} />
      </div>
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
