import { action, makeObservable, observable } from "mobx"
import qs from "qs"

type PrivateFields = "_params"

class QueryParamsStore {
  private _params: qs.ParsedQs = {}
  private _search: string = ""

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      setParam: action,
    })

    if (typeof window !== "undefined") {
      this.setSearch(window.location.search)
    }
  }

  getParam(
    key: string
  ): undefined | string | qs.ParsedQs | (string | qs.ParsedQs)[] {
    return this._params[key]
  }

  setParam(key: string, value: string) {
    this._params[key] = value
    this._updateSearchFromParams()
  }

  private _updateSearchFromParams() {
    this._search = qs.stringify(this._params)
    if (typeof window !== "undefined") {
      const newUrl = `${window.location.pathname}?${this._search}`
      window.history.replaceState(null, "", newUrl)
    }
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search

    if (this._search !== search) {
      this._search = search
      this._params = qs.parse(search)
    }
  }
}

export default QueryParamsStore
