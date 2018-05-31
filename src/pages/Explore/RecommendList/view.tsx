import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import Matrix from '@/components/Matrix'
import Cover from '@/components/Cover'

export default observer(({ store }) => {

  const lists = store.payload ? store.payload.result :
    Array(6).fill({ key: 1, coverImg: null, })
      .map((item, index) => ({ ...item, key: index }))

  return (
    <div className={style.recommendList}>
      <Matrix width={33}>
        {
          lists.map(list => {
            return (
              <Cover
                key={list.id}
                coverImg={list.picUrl}
                playCount={list.playCount}
                URL={'ss'}
                listName={list.name}
              >
                {list.id}
              </Cover>
            )
          })
        }
      </Matrix >
    </div>
  )
})