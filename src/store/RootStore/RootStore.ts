import QueryStore from "../QueryStore"

class RootStore {
  query: QueryStore

  constructor() {
    this.query = new QueryStore()
  }
}

export default RootStore
