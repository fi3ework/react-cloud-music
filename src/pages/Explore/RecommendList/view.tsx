import * as React from 'react'
import * as style from './style.scss'
import { observer } from 'mobx-react'
import Matrix from '@/components/Matrix'
import Cover from '@/components/Cover'
import SectionTitle from '@/components/SectionTitle'
import Store from '@/utils/models/componentFetchModel'

type IProps = {
  store: Store
  normalizer: (result: object) => any[]
  title: string
}

export type IRecommendListPayload = {
  code: number
  result: object
}

const RecommendList: React.SFC<IProps> = ({ store, normalizer, title }) => {
  const payload = store.payload as IRecommendListPayload
  const lists = payload
    ? normalizer(payload.result)
    : Array(6)
        .fill({ key: '', coverImg: null, link: '' })
        .map((item, index) => ({ ...item, key: index }))

  return (
    <div className={style.recommendList}>
      <SectionTitle>{title}</SectionTitle>
      <Matrix width={33}>
        {lists.slice(0, 6).map((list, index) => {
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
        })}
      </Matrix>
    </div>
  )
}

export default observer(RecommendList)
