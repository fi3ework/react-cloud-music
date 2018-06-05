import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import Matrix from '@/components/Matrix'
import Cover from '@/components/Cover'
import SectinTitle from '@/components/SectionTitle'

export default observer(({ store, normalizer, title }) => {

  const lists = store.payload ? normalizer(store.payload.result) :
    Array(6).fill({ key: '', coverImg: null, })
      .map((item, index) => ({ ...item, key: index }))

  return (
    <div className={style.recommendList}>
      <SectinTitle>{title}</SectinTitle>
      <Matrix width={33}>
        {
          lists.slice(0, 6).map((list, index) => {
            return (
              <Cover
                key={index}
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