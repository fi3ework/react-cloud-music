import React from 'react'

export const slidePos = {
  pos: 0,
  changePos(newPos) {
    slidePos.pos = newPos
  }
}

export const SlideContext = React.createContext(
  slidePos // default value
)
