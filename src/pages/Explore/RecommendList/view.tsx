import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import Matrix from '@/components/Matrix'
import Cover from '@/components/Cover'
import SectionTitle from '@/components/SectionTitle'

export default observer(({ store, normalizer, title }) => {

  const lists = store.payload ? normalizer(store.payload.result) :
    Array(6).fill({ key: '', coverImg: null, link: '' })
      .map((item, index) => ({ ...item, key: index }))

  return (
    <div className={style.recommendList}>
      <SectionTitle>{title}</SectionTitle>
      <Matrix width={33} >
        {
          lists.slice(0, 6).map((list, index) => {
            return (
              <Cover
                key={index}
                coverImg={list.picUrl}
                playCount={list.playCount}
                path={list.path}
                listName={list.name}
                id={list.id}
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