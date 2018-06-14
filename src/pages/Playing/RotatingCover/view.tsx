import React from 'react'
import { connect } from 'react-redux'
import { IPlayingSong } from '../../../store'

type IProps = {
  IPlayingSong
}

class RotatingCover extends React.Component<IProps> {
  render() {
    return (
      <div>
        asdfjkasdklfsa;jklddf
        <audio src="someaudio.wav" />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state
}

export default connect(mapStateToProps)(RotatingCover)
