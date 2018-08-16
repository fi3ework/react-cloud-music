import NETEASE_API, { getURL } from '@/constant/api'
import axios from 'axios'

// ===== constant ===== //
export const PLAY_SONG = 'PLAY_SONG'
export const FETCH_URL = 'FETCH_URL'
export const FETCH_SONG_DETAIL_SUCCESS = 'FETCH_SONG_DETAIL_SUCCESS'
export const FETCH_SONG_URL_SUCCESS = 'FETCH_SONG_URL_SUCCESS'
export const SWITCH_PREV_SONG = 'SWITCH_PREV_SONG'
export const SWITCH_NEXT_SONG = 'SWITCH_NEXT_SONG'
export const SWITCH_PLAY_STATE = 'SWITCH_PLAY_STATE'
export const PUSH_TO_PLAYLIST = 'PUSH_TO_PLAYLIST'
export const EMPTY_PLAYLIST = 'EMPTY_PLAYLIST'
export const PLAY_PLAYLIST = 'PLAY_PLAYLIST'
export const CHANGE_PLAYLIST_INDEX = 'CHANGE_PLAYLIST_INDEX'

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
  name: string
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
    name: '',
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

// 更改播放列表中的 index
export const changePlaylistIndexActionCreator: any = ({ pace, nextIndex }: { pace?: number; nextIndex?: number }) => {
  return dispatch => {
    if (typeof pace === 'number') {
      dispatch({
        type: CHANGE_PLAYLIST_INDEX,
        pace
      })
    } else if (typeof nextIndex === 'number') {
      dispatch({
        type: CHANGE_PLAYLIST_INDEX,
        nextIndex
      })
    } else {
      dispatch({
        type: CHANGE_PLAYLIST_INDEX
      })
    }
  }
}

// compose：切换 index + 播放当前 index
export const SwitchSongByPace: (pace: number) => void = pace => {
  return (dispatch, getState) => {
    // 1. 先在调整当前播放歌曲的 index
    dispatch(changePlaylistIndexActionCreator({ pace }))
    // 2. 开始播放当前列表
    dispatch({
      type: PLAY_PLAYLIST
    })
    // 3. 异步获取对应的歌曲 url
    const currState: IStoreState = getState()
    dispatch(fetchSongUrl(currState.playingSong.id))
  }
}

// 切换播放/暂停
export const switchPlayState: IAction = {
  type: SWITCH_PLAY_STATE
}

// 将歌曲添加到播放列表中
export const addToPlaylist: IActionCreator = songs => {
  return {
    type: PUSH_TO_PLAYLIST,
    songsToPush: Array.isArray(songs.songsToPush) ? songs.songsToPush : [songs.songsToPush]
  }
}

// 开始播放当前列表
export const playCurrPlaylist: any = (songs, index = 0) => {
  console.log('play current list')
  return (dispatch, getState) => {
    // 1. 将歌添加到播放列表中
    dispatch(
      addToPlaylist({
        type: PUSH_TO_PLAYLIST,
        songsToPush: Array.isArray(songs) ? songs : [songs]
      })
    )
    // 2. 将 currIndex 置为 0
    dispatch(changePlaylistIndexActionCreator({ nextIndex: index }))
    // 3. 开始播放 currIndex 对应的歌曲
    dispatch({
      type: PLAY_PLAYLIST
    })
    // 4. 异步获取对应的歌曲 url
    const currState: IStoreState = getState()
    dispatch(fetchSongUrl(currState.playingSong.id))
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

// 已成功到获取一首歌的详情
export const syncReplacePlayingSong: IActionCreator = payload => ({
  type: FETCH_SONG_DETAIL_SUCCESS,
  payload
})

// 异步获取一首歌的 URL 成功
export const fetchSongUrlSuccessActionCreator: IActionCreator = payload => ({
  type: FETCH_SONG_URL_SUCCESS,
  payload
})

// 异步获取一首歌的详情（export 给组件）
export const fetchSongDetail = id =>
  generateFetchActionCreator(getURL(NETEASE_API.songDetail, { ids: id }), syncReplacePlayingSong)

// 异步获取一首歌的 URL（export 给组件）
export const fetchSongUrl = id =>
  generateFetchActionCreator(getURL(NETEASE_API.songUrl, { ids: id }), fetchSongUrlSuccessActionCreator)

// 通用异步获取
export const generateFetchActionCreator = (URL, actionCreator) => {
  // TODO: 加入取消之前的请求
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
const fetchSongDetailSuccessReducer: IReducer = (state, action) => {
  const firstSong = action.payload.songs[0]
  const prevPlayingSong = state.playingSong
  const nextPlayingSong = { ...prevPlayingSong, coverImg: firstSong.al.picUrl }
  return { ...state, playingSong: nextPlayingSong }
}

// 歌曲 URL reducer
const fetchSongUrlSuccessReducer: IReducer = (state, action) => {
  const firstSong = action.payload.data[0]
  const prevPlayingSong = state.playingSong
  const nextPlayingSong = { ...prevPlayingSong, url: firstSong.url }
  return { ...state, playingSong: nextPlayingSong }
}

// 开始播放当前列表中对应 index 的歌曲
const playCurrSongReducer: IReducer = (state, action) => {
  const nextPlayingSong: IPlayingSong = state.playlist.list[state.playlist.currIndex]
  const nextPlayingState: IPlayState = {
    isPlaying: true,
    cycleMode: state.playState.cycleMode,
    playingTime: 0
  }
  return { ...state, playingSong: nextPlayingSong, playState: nextPlayingState }
}

// 更改列表中的 index
const changePlaylistIndexReducer: IReducer = (state, action) => {
  console.log('切歌')
  const prevPlaylist = state.playlist
  let nextSongIndex
  if (typeof action.pace === 'number') {
    nextSongIndex = prevPlaylist.currIndex + action.pace
  } else if (typeof action.nextIndex === 'number') {
    nextSongIndex = action.nextIndex
  } else {
    nextSongIndex = prevPlaylist.currIndex
  }

  // 如果超出播放列表的边界则什么都不做
  // TODO: 全部循环时列表会首尾相接
  if (nextSongIndex < 0 || nextSongIndex >= prevPlaylist.list.length || nextSongIndex === prevPlaylist.currIndex) {
    return state
  }
  const nextIndex = nextSongIndex
  const nextPlaylist = { ...prevPlaylist, currIndex: nextIndex }
  return { ...state, playlist: nextPlaylist }
}

// 切换播放/暂停状态
const switchPlayingStateReducer: IReducer = (state, action) => {
  const prevPlayState = state.playState
  const nextPlayState = { ...prevPlayState, isPlaying: !prevPlayState.isPlaying }
  return { ...state, playState: nextPlayState }
}

// 将新的歌推入歌单中
const pushSongsToPlaylistReducer: IReducer = (state, action) => {
  const prevPlaylist = state.playlist
  const nextPlaylist = { ...prevPlaylist, list: action.songsToPush }
  return { ...state, playlist: nextPlaylist }
}

// 总 reducer
export const reducers: IReducer = (state, action) => {
  // console.log(action)
  switch (action.type) {
    case PLAY_PLAYLIST:
      return playCurrSongReducer(state, action)
    case FETCH_SONG_DETAIL_SUCCESS:
      return fetchSongDetailSuccessReducer(state, action)
    case FETCH_SONG_URL_SUCCESS:
      return fetchSongUrlSuccessReducer(state, action)
    case CHANGE_PLAYLIST_INDEX:
      return changePlaylistIndexReducer(state, action)
    case SWITCH_PLAY_STATE:
      return switchPlayingStateReducer(state, action)
    case PUSH_TO_PLAYLIST:
      return pushSongsToPlaylistReducer(state, action)
    default:
      return state
  }
}
