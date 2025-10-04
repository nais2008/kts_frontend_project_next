import GitHubStore from "../GitHubStore"
import QueryStore from "../QueryStore"

class RootStore {
  // github: GitHubStore
  query: QueryStore

  constructor() {
    this.query = new QueryStore()
    // this.github = new GitHubStore()
  }
}

export default RootStore
