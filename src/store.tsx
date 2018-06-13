import NETEASE_API, { getURL } from '@/constant/api'
import axios from 'axios'

export const PLAY_SONG = 'click on a fucking song to fucking play'
export const FETCH_URL = 'start to fetching a fucking url'

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

export const generateFetchActionCreator = URL => {
  return new Promise(() => {
    return axios
      .get(URL)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  })
}

export const fetchSongDetail = id => {
  console.log(getURL(NETEASE_API.songDetail, { ids: id }))
  return generateFetchActionCreator(getURL(NETEASE_API.songDetail, { ids: id }))
}

// fetch new song details
const fetchURL: IReducer = (state, action) => {
  const songId = action.id
  return state
}

// click on a new song to play
const playSong: IReducer = (state, action) => {
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
}

export const reducers: IReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case PLAY_SONG:
      return playSong(state, action)
    case FETCH_URL:
      return fetchURL(state, action)
    default:
      return state
  }
}
