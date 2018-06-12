import * as React from 'react'
import * as style from './style.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

interface IProps {
  style: React.CSSProperties
}

class App extends React.Component<IProps> {
  render() {
    return (
      <TransitionGroup className="todo-list">
        <CSSTransition key={'v'} timeout={500} classNames="fade">
          <div className={style.wrapper} style={{ ...this.props.style }}>
            <div className={style.content}>playing...</div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default App
