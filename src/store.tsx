export const PLAY_SONG = 'click on a fucking song to fucking play'

export type IAction = {
  readonly type: string
  [propName: string]: any
}

export type IActionCreator = (param: any) => IAction

enum CycleMode {
  single = 0,
  all,
  random
}

export type IPlayingState = {
  isPlaying: boolean
  cycleMode: CycleMode
  playingTime: number
}

export type IPlayingSong = {
  id: string
  coverImg: string
}

export type IStoreState = {
  playingSong: IPlayingSong
  playingState: IPlayingState
}

export const defaultState: IStoreState = {
  playingSong: {
    id: '',
    coverImg: ''
  },
  playingState: {
    isPlaying: false,
    cycleMode: CycleMode.all,
    playingTime: 0
  }
}

type IReducer = (state: IStoreState, action: IAction) => IStoreState

export const playSongActionCreator: IActionCreator = id => ({
  type: PLAY_SONG,
  nextPlayingSongId: id
})

export const reducers: IReducer = (state, action) => {
  switch (action.type) {
    case PLAY_SONG:
      console.log(state)
      if (state.playingSong.id === action.id) {
        return state
      } else {
        const nextPlayingSong: IPlayingSong = { id: action.nextPlayingSongId, coverImg: '' }
        const nextPlayingState: IPlayingState = {
          isPlaying: true,
          cycleMode: state.playingState.cycleMode,
          playingTime: 0
        }
        return { ...state, playingSong: nextPlayingSong, playingState: nextPlayingState }
      }
    default:
      return state
  }
}
