import * as React from 'react'
import * as style from './style.scss'

export default class SectionTitle extends React.Component {
  public render() {
    return (
      <h3 className={style.title}>
        {this.props.children}
      </h3>
    )
  }
}
