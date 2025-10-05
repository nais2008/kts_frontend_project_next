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

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search

    if (this._search !== search) {
      this._search = search
      this._params = qs.parse(search)
    }
  }
}

export default QueryParamsStore
