import * as React from 'react'
import * as style from './style.scss'
import ListCover from './ListCover'

const listIndexes: number[] = Array(23)
  .fill(0)
  .map((item, index) => index)

export default class List extends React.Component<any, any> {
  render() {
    return (
      <div className={style.lists}>
        {listIndexes.map(itemIndex => {
          return <ListCover key={itemIndex} listIndex={itemIndex} />
        })}
      </div>
    )
  }
}
