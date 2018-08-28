const calcPlayCount = playCount => {
  if (playCount > 100000000) {
    return `${(playCount / 100000000).toFixed(1)}亿`
  }

  if (playCount > 10000) {
    return `${Math.floor(playCount / 10000)}万`
  }

  return String(playCount)
}

export { calcPlayCount }
