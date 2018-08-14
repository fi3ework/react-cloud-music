import React from 'react'

export const slidePos = {
  pageIndex: 0,
  pos: 0,
  changePos(newPos) {
    slidePos.pos = newPos
  },
  setPageIndex(index) {
    slidePos.pageIndex = index
  }
}

export const SlideContext = React.createContext(
  slidePos // default value
)
