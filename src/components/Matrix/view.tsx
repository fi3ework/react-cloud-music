import * as React from 'react'
import * as style from './style.scss'


interface IProps{
  children: any;
  cols: number;
  width: number;
}

const Matrix = ({ children, cols = 3, width }): any => {
  if (!children) {
    return null
  }

  const layoutWidht = width ? `${width}%` : `${100 / cols}%`

  console.log(children)
  const rows: any[] = []
  for (let i = 0; i < children.length; i += cols) {
    const currRow = children.slice(i, i + cols)
    rows.push(currRow.map((item, index) => {
      return (
        <div key={index} style={{ width: layoutWidht }}>{item}</div>
      )
    }))
  }
  console.log(rows)
  // wrap a col
  return rows.map((row, index) => {
    return <div className={style.row} key={index}>{row}</div>
  })
}

export default Matrix