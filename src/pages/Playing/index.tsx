import * as React from 'react'
import * as style from './style.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { IStoreState, IPlayingSong, IPlayingState } from '../../store'
import RotatingCover from './RotatingCover'
import Header from './HeaderBar'
import ControlBar from './ControlBar'

interface IProps {
  style: React.CSSProperties
  playingState: IPlayingState
  playingSong: IPlayingSong
}

class PlayingPage extends React.Component<IProps> {
  handleSwitchPrevSong = () => {
    console.log('←')
  }

  handleSwitchNextSong = () => {
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
    playingState: state.playingState,
    playingSong: state.playingSong
  }
}

export default connect(mapStateToProps)(PlayingPage)
