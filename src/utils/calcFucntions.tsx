
const calcPalyCount = (playCount) => (playCount > 10000 ? `${Math.floor(playCount / 10000)}万` : playCount)

export { calcPalyCount }