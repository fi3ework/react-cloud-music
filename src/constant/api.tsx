import { compile } from 'path-to-regexp'

type IPath = {
  path: string
}

type IApi =
  | string
  | {
      path: string
    }

type Iapis = {
  banner: IApi
  recommendList: IApi
  recommendSong: IApi
  songDetail: IApi
  playlist: IApi
  songUrl: IApi
  songUrlBackUp: IApi
  list: IApi
}

const PROXY_HOST = process.env.NODE_ENV === 'production' ? 'http://118.24.21.99:4001' : '/api'

const NETEASE_API: Iapis = {
  banner: '/banner', // 轮播图
  recommendList: '/personalized', // 推荐歌单
  recommendSong: '/personalized/newsong', // 推荐歌曲
  // 歌单详情
  playlist: {
    path: '/playlist/detail?id=:id'
  },
  // 歌曲URL
  songUrl: {
    path: '/music/url?id=:ids'
  },
  // 歌曲详情
  songDetail: {
    path: '/song/detail?ids=:ids'
  },
  // 歌曲 URL 备胎
  songUrlBackUp: {
    path: 'http://music.163.com/song/media/outer/url?id=:id.mp3'
  },
  // 排行榜
  list: {
    path: '/top/list?idx=:idx'
  }
}

// 给 URL 添加 hostPath
const addHost = (URL, hostPath) => {
  return hostPath + URL
}

export default NETEASE_API

// 根据 API 和 params 来 compose URL
export const getURL = (API: IApi, params?) => {
  // simple API
  if (!params) {
    return addHost(API, PROXY_HOST)
  }
  // complex API
  const toPath = compile(`${(API as IPath).path}`)
  const urlWithoutHost = toPath(params)
  return addHost(urlWithoutHost, PROXY_HOST)
}
