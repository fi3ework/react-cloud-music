import { compile } from 'path-to-regexp'

const NETEASE_API = {
  banner: '/banner', // 轮播图
  recommendList: '/personalized', // 推荐歌单
  recommendSong: '/personalized/newsong', // 推荐歌曲
  songDetail: {
    // 歌曲详情
    path: '/song/detail?ids=:ids'
  },
  // 歌单详情
  playlist: {
    path: '/playlist/:id'
  },
  // 歌曲URL
  songUrl: {
    path: 'http://music.163.com/song/media/outer/url?id=:id.mp3 '
  }
}

export const getURL = (API: any, params?) => {
  // simple API
  if (!params) {
    return API
  }
  // complex API
  const toPath = compile(`${API.path}`)
  return toPath(params)
}

export default NETEASE_API
