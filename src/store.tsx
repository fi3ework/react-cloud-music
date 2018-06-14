import NETEASE_API, { getURL } from '@/constant/api'
import axios from 'axios'

// ===== constant ===== //
export const PLAY_SONG = 'click on a fucking song to fucking play'
export const FETCH_URL = 'start to fetching a fucking url'
export const FETCH_SONG_DETIAL_SUCCESS = 'the fucking song fetch success'
export const FETCH_SONG_URL_SUCCESS = 'the fucking song url fetch success'

// ===== type ===== //

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

// 同步 action 修改
export type IPlayingState = {
  isPlaying: boolean
  cycleMode: CycleMode
  playingTime: number
}

// 异步 action 修改
export type IPlayingSong = {
  id: string
  coverImg: string
  url: string
  artists: string
  album: string
}

export type IStoreState = {
  playingSong: IPlayingSong
  playingState: IPlayingState
}

export const defaultState: IStoreState = {
  playingSong: {
    id: '',
    coverImg: '',
    url: '',
    artists: '',
    album: ''
  },
  playingState: {
    isPlaying: false,
    cycleMode: CycleMode.all,
    playingTime: 0
  }
}

type IReducer = (state: IStoreState, action: IAction) => IStoreState

// ===== action creator ===== //

export const playSongActionCreator: IActionCreator = id => ({
  type: PLAY_SONG,
  nextPlayingSongId: id
})

export const fetchSongDetailSucceedActionCreator: IActionCreator = payload => ({
  type: FETCH_SONG_DETIAL_SUCCESS,
  payload
})

export const fetchSongUrlActionCreator: IActionCreator = payload => ({
  type: FETCH_SONG_URL_SUCCESS,
  payload
})

export const fetchSongDetail = id =>
  generateFetchActionCreator(getURL(NETEASE_API.songDetail, { ids: id }), fetchSongDetailSucceedActionCreator)

export const fetchSongUrl = id =>
  generateFetchActionCreator(getURL(NETEASE_API.songUrl, { ids: id }), fetchSongUrlActionCreator)

export const generateFetchActionCreator = (URL, actionCreator) => {
  return axios
    .get(URL)
    .then(response => {
      console.log(response.data)
      return actionCreator(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}

// ===== action reducers ===== //

// 歌曲详情 reducer
const fetchSongDetialSuccess: IReducer = (state, action) => {
  console.log(action)
  const firstSong = action.payload.songs[0]
  const prevPlaingSong = state.playingSong
  const nextPlayingSong = { ...prevPlaingSong, coverImg: firstSong.al.picUrl }
  return { ...state, playingSong: nextPlayingSong }
}

// 歌曲 URL reducer
const fetchSongUrlSuccess: IReducer = (state, action) => {
  // console.log(action)
  const firstSong = action.payload.data[0]
  const prevPlaingSong = state.playingSong
  const nextPlayingSong = { ...prevPlaingSong, url: firstSong.url }
  // console.log({ ...state, playingSong: nextPlayingSong })
  return { ...state, playingSong: nextPlayingSong }
}

// 点击一首歌开始播放，更改同步状态
const playSong: IReducer = (state, action) => {
  console.log(action)
  if (state.playingSong.id === action.id) {
    return state
  } else {
    const prevPlayingSong: IPlayingSong = state.playingSong
    const nextPlayingSong: IPlayingSong = { ...prevPlayingSong, id: action.nextPlayingSongId,  }
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
    case FETCH_SONG_DETIAL_SUCCESS:
      return fetchSongDetialSuccess(state, action)
    case FETCH_SONG_URL_SUCCESS:
      return fetchSongUrlSuccess(state, action)
    default:
      return state
  }
}
