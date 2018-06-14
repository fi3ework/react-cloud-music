import NETEASE_API, { getURL } from '@/constant/api'
import axios from 'axios'

// ===== constant ===== //
export const PLAY_SONG = 'click on a fucking song to fucking play'
export const FETCH_URL = 'start to fetching a fucking url'
export const FETCH_SONG_DETIAL_SUCCESS = 'the fucking song fetch success'
export const FETCH_SONG_URL_SUCCESS = 'the fucking song url fetch success'
export const SWITCH_PREV_SONG = 'switch to prev fucking song'
export const SWITCH_NEXT_SONG = 'switch to next fucking song'
export const SWITCH_PLAY_STATE = 'switch fucking pause or play'
export const PUSH_TO_PLAYLIST = 'push the fucking song to the fucking playlist'
export const EMPTY_PLAYLIST = 'clear the fucking playlist'
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
export type IPlayState = {
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

export type IPlaylist = {
  currIndex: number
  list: IPlayingSong[]
}

export type IStoreState = {
  playingSong: IPlayingSong
  playState: IPlayState
  playlist: IPlaylist
}

export const defaultState: IStoreState = {
  playingSong: {
    id: '',
    coverImg: '',
    url: '',
    artists: '',
    album: ''
  },
  playState: {
    isPlaying: false,
    cycleMode: CycleMode.all,
    playingTime: 0
  },
  playlist: {
    currIndex: 0,
    list: []
  }
}

type IReducer = (state: IStoreState, action: IAction) => IStoreState

// ===== action creator ===== //

// 切换到播放列表中的上一首歌
export const switchPrevSong: IAction = {
  type: SWITCH_PREV_SONG,
  pace: -1
}

// 切换到播放列表中的下一首歌
export const switchNextSong: IAction = {
  type: SWITCH_NEXT_SONG,
  pace: 1
}

// 切换播放 / 暂停
export const switchPlayState: IAction = {
  type: SWITCH_PLAY_STATE
}

// 将歌曲添加到播放列表中
export const addToPlaylist: IActionCreator = songs => {
  return {
    type: PUSH_TO_PLAYLIST,
    songsToPush: Array.isArray(songs) ? songs : [songs]
  }
}

// 将播放列表清空
export const emptyPlaylist: IActionCreator = () => {
  return {
    type: EMPTY_PLAYLIST
  }
}

// 点击一首歌
export const playSongActionCreator: IActionCreator = id => ({
  type: PLAY_SONG,
  nextPlayingSongId: id
})

// 异步获取一首歌的详情
export const fetchSongDetailSucceedActionCreator: IActionCreator = payload => ({
  type: FETCH_SONG_DETIAL_SUCCESS,
  payload
})

// 异步获取一首歌的 URL
export const fetchSongUrlActionCreator: IActionCreator = payload => ({
  type: FETCH_SONG_URL_SUCCESS,
  payload
})

// 异步获取一首歌的详情（export 给组件）
export const fetchSongDetail = id =>
  generateFetchActionCreator(getURL(NETEASE_API.songDetail, { ids: id }), fetchSongDetailSucceedActionCreator)

// 异步获取一首歌的 URL（export 给组件）
export const fetchSongUrl = id =>
  generateFetchActionCreator(getURL(NETEASE_API.songUrl, { ids: id }), fetchSongUrlActionCreator)

// 通用异步获取
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
const fetchSongDetialSuccessReducer: IReducer = (state, action) => {
  console.log(action)
  const firstSong = action.payload.songs[0]
  const prevPlaingSong = state.playingSong
  const nextPlayingSong = { ...prevPlaingSong, coverImg: firstSong.al.picUrl }
  return { ...state, playingSong: nextPlayingSong }
}

// 歌曲 URL reducer
const fetchSongUrlSuccessReducer: IReducer = (state, action) => {
  const firstSong = action.payload.data[0]
  const prevPlaingSong = state.playingSong
  const nextPlayingSong = { ...prevPlaingSong, url: firstSong.url }
  return { ...state, playingSong: nextPlayingSong }
}

// 点击一首歌开始播放，更改同步状态
const playSongReducer: IReducer = (state, action) => {
  console.log(action)
  if (state.playingSong.id === action.id) {
    return state
  } else {
    const prevPlayingSong: IPlayingSong = state.playingSong
    const nextPlayingSong: IPlayingSong = { ...prevPlayingSong, id: action.nextPlayingSongId }
    const nextPlayingState: IPlayState = {
      isPlaying: true,
      cycleMode: state.playState.cycleMode,
      playingTime: 0
    }
    return { ...state, playingSong: nextPlayingSong, playState: nextPlayingState }
  }
}

// 切换前后歌
const switchSongReducer: IReducer = (state, action) => {
  console.log('切歌')
  const prevPlaylist = state.playlist
  const nextSongIndex = prevPlaylist.currIndex + action.pace
  // 如果超出播放列表的边界则什么都不做
  // TODO: 全部循环时列表会首尾相接
  if (nextSongIndex < 0 || nextSongIndex >= prevPlaylist.list.length) {
    return state
  }
  const nextIndex = nextSongIndex
  const nextPlaylist = { ...prevPlaylist, currIndex: nextIndex }
  const prevPlayState = state.playState
  const nextPlayState = { ...prevPlayState, isPlaying: true }
  return { ...state, playState: nextPlayState, playlist: nextPlaylist }
}

// 切换播放状态
const switchPlayStateReducer: IReducer = (state, action) => {
  const prevPlayState = state.playState
  const nextPlayState = { ...prevPlayState, isPlaying: !prevPlayState.isPlaying }
  return { ...state, playState: prevPlayState }
}
export const reducers: IReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case PLAY_SONG:
      return playSongReducer(state, action)
    case FETCH_SONG_DETIAL_SUCCESS:
      return fetchSongDetialSuccessReducer(state, action)
    case FETCH_SONG_URL_SUCCESS:
      return fetchSongUrlSuccessReducer(state, action)
    case SWITCH_PREV_SONG:
      return switchSongReducer(state, action)
    case SWITCH_NEXT_SONG:
      return switchSongReducer(state, action)
    case SWITCH_PLAY_STATE:
      return switchPlayStateReducer(state, action)
    default:
      return state
  }
}
