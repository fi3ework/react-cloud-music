import * as React from 'react'
import * as style from './style.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { IStoreState, IPlayingSong, IPlayState, SwitchSongByPace, fetchSongUrl } from '../../store'
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
    console.log('←')
  }

  handleSwitchNextSong = () => {
    this.context.store.dispatch(SwitchSongByPace(1))
    console.log('→')
  }

  handleSwitchPlayState = () => {
    console.log('!!!')
  }

  render() {
    console.log(this.props)
    return (
      <TransitionGroup className="todo-list">
        <CSSTransition key={'v'} timeout={500} classNames="fade">
          <div className={style.wrapper} style={{ ...this.props.style }}>
            <Header artists={this.props.playingSong.artists} album={this.props.playingSong.album} />
            <RotatingCover playingSong={this.props.playingSong} />
            <ControlBar
              switchPrevSong={this.handleSwitchPrevSong}
              switchNextSong={this.handleSwitchNextSong}
              switchPlayState={this.handleSwitchPlayState}
            />
            <audio src={this.props.playingSong.url} autoPlay={true} />
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

export default connect(mapStateToProps)(PlayingPage)
