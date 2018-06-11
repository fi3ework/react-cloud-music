import * as React from 'react'
import * as style from './style.scss'

const SectionTitle: React.SFC = ({ children }) => {
  return <h3 className={style.title}>{children}</h3>
}

export default SectionTitle
