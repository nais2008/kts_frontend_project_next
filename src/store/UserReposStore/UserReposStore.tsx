import { ENDPOINTS } from "@/constants/endpoints"
import { ILocalStore } from "@/shared/interfaces/localStore.interface"
import {
  type IGitHubRepoAPI,
  type IGitHubRepoModel,
  normilizeRepo,
} from "@/shared/interfaces/repository.interface"
import {
  TCollectionMoldel,
  getInitialCollectionModel,
  lineorizeCollection,
  normilizeCollection,
} from "@/shared/types/colletction.type"
import { HTTPMethod } from "@/shared/types/httpMethod.type"
import { MetaValues } from "@/shared/types/meta.type"
import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx"

import ApiStore from "../ApiStore"
import rootStore from "../RootStore"

const REPO_PER_PAGE = 9

type PrivateFields =
  | "_list"
  | "_meta"
  | "_currentPage"
  | "_hasMore"
  | "_repoType"

export interface ICreateRepoParams {
  name: string
  description?: string
  homepage?: string
  private: boolean
  has_issues?: boolean
  has_wiki?: boolean
  has_downloads?: boolean
}

class UserReposStore implements ILocalStore {
  private readonly _apiStore = new ApiStore()
  private _list: TCollectionMoldel<number, IGitHubRepoModel> =
    getInitialCollectionModel()
  private _meta: MetaValues = MetaValues.INITIAL

  private _currentPage = 1
  private _hasMore = true
  private _accessToken = ""
  private _repoType = "all"

  constructor() {
    makeObservable<UserReposStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _currentPage: observable,
      _hasMore: observable,
      _repoType: observable,
      list: computed,
      meta: computed,
      hasMore: computed,
      setAccessToken: action,
      init: action,
      getUserRepos: action,
      getMoreRepos: action,
    })
  }

  setAccessToken(token: string) {
    this._accessToken = token
  }

  init(token: string) {
    this.setAccessToken(token)
    this.getUserRepos()
  }

  get list(): IGitHubRepoModel[] {
    return lineorizeCollection(this._list)
  }

  get meta(): MetaValues {
    return this._meta
  }

  get hasMore(): boolean {
    return this._hasMore
  }

  async getUserRepos() {
    if (!this._accessToken) return
    this._meta = MetaValues.LOADING
    this._list = getInitialCollectionModel()
    this._currentPage = 1
    this._hasMore = true

    await this._fetchRepos(this._currentPage)
  }

  async getMoreRepos() {
    if (!this._hasMore || this._meta === MetaValues.LOADING) return
    this._meta = MetaValues.LOADING
    const nextPage = this._currentPage + 1
    await this._fetchRepos(nextPage, true)
  }

  private async _fetchRepos(page: number, append = false) {
    try {
      const response = await this._apiStore.request<IGitHubRepoAPI[]>({
        method: HTTPMethod.GET,
        endpoint: ENDPOINTS.userRepositories.create(),
        params: {
          page: page,
          per_page: REPO_PER_PAGE,
          type: this._repoType,
        },
        headers: {
          Authorization: `token ${this._accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
      runInAction(() => {
        if (!response.success || !response.data) {
          this._meta = MetaValues.ERROR
          return
        }

        const list = response.data.map(normilizeRepo)
        const newList = normilizeCollection(list, (i) => i.id)

        this._list = append
          ? normilizeCollection([...this.list, ...list], (i) => i.id)
          : newList

        this._currentPage = page
        this._hasMore = list.length === REPO_PER_PAGE
        this._meta = MetaValues.SUCCESS
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this._meta = MetaValues.ERROR
      })
    }
  }
  async createRepository(params: ICreateRepoParams): Promise<boolean> {
    if (!this._accessToken) return false

    let success = false

    try {
      const response = await this._apiStore.request<IGitHubRepoAPI>({
        method: HTTPMethod.POST,
        endpoint: ENDPOINTS.userRepositories.create(),
        data: params,
        headers: {
          Authorization: `token ${this._accessToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
      })

      runInAction(() => {
        if (response.success && response.data) {
          const newRepoModel = normilizeRepo(response.data)

          const currentList = lineorizeCollection(this._list)

          const updatedList = [newRepoModel, ...currentList]

          this._list = normilizeCollection(updatedList, (i) => i.id)

          success = true
        } else {
          success = false
        }
      })
    } catch (error) {
      console.error("Error during repository creation:", error)
      runInAction(() => {
        success = false
      })
    }

    return success
  }
  destroy(): void {
    this._typeReaction()
  }
  private readonly _typeReaction = reaction(
    () => rootStore.query.getParam("type"),
    (type) => {
      this._repoType = typeof type === "string" ? type : "all"
      this.getUserRepos()
    }
  )
}

export default UserReposStore
