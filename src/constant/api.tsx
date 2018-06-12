const NETEASE_API = {
  banner: '/banner',
  recommendList: '/personalized',
  recommendSong: '/personalized/newsong',
  songDetail: '/personalized/newsong',
  playlist: {
    path: '/playlist/:id',
    params: 'id'
  },
  songUrl: {
    path: '/music/url?id',
    query: 'id'
  }
}

export const getAPI = API => {
  if (typeof API === 'string') {
    return API
  } else {
    return API.path
  }
}

export default NETEASE_API
