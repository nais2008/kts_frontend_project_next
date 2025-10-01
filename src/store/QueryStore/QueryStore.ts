import { makeAutoObservable } from "mobx"

class QueryStore {
  params: Map<string, string> = new Map()

  constructor() {
    makeAutoObservable(this)
    this.loadFromUrl()
  }

  setParam(key: string, value: string) {
    if (value) {
      this.params.set(key, value)
    } else {
      this.params.delete(key)
    }
    this.updateUrl()
  }

  getParam(key: string) {
    return this.params.get(key) || ""
  }

  loadFromUrl() {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.forEach((value, key) => {
      this.params.set(key, value)
    })
  }

  updateUrl() {
    const searchParams = new URLSearchParams()
    this.params.forEach((value, key) => {
      searchParams.set(key, value)
    })
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    window.history.replaceState(null, "", newUrl)
  }
}

export default QueryStore
