import mobx, { observable, action } from 'mobx'

mobx.configure({ enforceActions: true })

class Store {
    @observable githubProjects = []
    @observable state = 'pending' // "pending" / "done" / "error"

    @action
    fetchProjects() {
      this.githubProjects = []
      this.state = 'pending'
      fetchGithubProjectsSomehow().then(
        projects => {
          const filteredProjects = somePreprocessing(projects)
          // 将‘“最终的”修改放入一个异步动作中
          runInAction(() => {
            this.githubProjects = filteredProjects
            this.state = 'done'
          })
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