import { configure, observable, action, runInAction, computed, autorun } from 'mobx'

configure({ enforceActions: true })

interface IOption{
  URL: string;
}

class Store {
  @observable public URL: string = ''
  @observable public payload: null | object = null
  @observable public state: string = 'pending' // "pending" / "done" / "error"

  constructor(option: IOption) {
    this.URL = option.URL
  }

  public fetchURL = () => {
    return fetch('/api' + this.URL, {})
  }

  @action
  public fetchData() {
    this.state = 'pending'
    this.fetchURL().then(
      response => {
        if (response.status !== 200) {
          throw new Error('Fail to get response with status:' + response.status)
        }
        response.json().then((payload) => {
          runInAction(() => {
            this.state = 'done'
            this.payload = payload
          })
        }).catch((error) => {
          throw new Error('Invalid json response: ' + error)
        })
        // 将‘“最终的”修改放入一个异步动作中
      },
      error => {
        // 过程的另一个结局:...
        runInAction(() => {
          this.state = 'error'
        })
      }
    )
  }
}

export default Store