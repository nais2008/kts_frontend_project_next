import { ENDPOINTS } from "@/constants/endpoints"
import type { ILocalStore } from "@/shared/interfaces/localStore.interface"
import {
  type IGitHubRepoAPI,
  type IGitHubRepoModel,
  normilizeRepo,
} from "@/shared/interfaces/repository.interface"
import {
  type TCollectionMoldel,
  getInitialCollectionModel,
  lineorizeCollection,
  normilizeCollection,
} from "@/shared/types/colletction.type"
import type { TGetOrganizationReposListParams } from "@/shared/types/getOrgReposLost.type"
import { HTTPMethod } from "@/shared/types/httpMethod.type"
import { MetaValues } from "@/shared/types/meta.type"
import ApiStore from "@/store/ApiStore"
import rootStore from "@/store/RootStore"
import {
  type IReactionDisposer,
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx"

const FAVORITES_KEY = "favoriteRepos"
const REPO_PER_PAGE = 9

type PrivateFields =
  | "_list"
  | "_meta"
  | "_favorites"
  | "_currentPage"
  | "_hasMore"
  | "_currentOrg"

class GitHubStore implements ILocalStore {
  private readonly _apiStore = new ApiStore()

  private _list: TCollectionMoldel<number, IGitHubRepoModel> =
    getInitialCollectionModel()
  private _meta: MetaValues = MetaValues.INITIAL
  private _favorites: IGitHubRepoModel[] = []

  private _currentPage = 1
  private _hasMore = true
  private _currentOrg = "ktsstudio"

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _favorites: observable.ref,
      _currentPage: observable,
      _hasMore: observable,
      _currentOrg: observable,
      list: computed,
      meta: computed,
      favorites: computed,
      hasMore: computed,
      getOrganizationReposList: action,
      getMoreRepos: action,
      toggleFavorite: action,
    })

    const favoritesFromStorage = typeof window !== "undefined"
      ? localStorage.getItem(FAVORITES_KEY)
      : null
    if (favoritesFromStorage) {
      this._favorites = JSON.parse(favoritesFromStorage)
    }
  }

  get list(): IGitHubRepoModel[] {
    return lineorizeCollection(this._list)
  }

  get meta(): MetaValues {
    return this._meta
  }

  get favorites(): IGitHubRepoModel[] {
    return this._favorites
  }

  get hasMore(): boolean {
    return this._hasMore
  }

  isFavorite(repoId: number): boolean {
    return this._favorites.some((repo) => repo.id === repoId)
  }

  toggleFavorite = (repo: IGitHubRepoModel) => {
    const existingIndex = this._favorites.findIndex((fav) => fav.id === repo.id)

    if (existingIndex !== -1) {
      this._favorites = this._favorites.filter((fav) => fav.id !== repo.id)
    } else {
      this._favorites = [...this._favorites, repo]
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(this._favorites))
  }

  async getOrganizationReposList(
    params: TGetOrganizationReposListParams
  ): Promise<void> {
    this._meta = MetaValues.LOADING
    this._list = getInitialCollectionModel()
    this._currentPage = 1
    this._hasMore = true
    this._currentOrg = params.orgName

    await this._fetchRepos(params.orgName, this._currentPage)
  }

  async getMoreRepos(): Promise<void> {
    if (!this._hasMore || this._meta === MetaValues.LOADING) return
    this._meta = MetaValues.LOADING

    const nextPage = this._currentPage + 1
    await this._fetchRepos(this._currentOrg, nextPage, true)
  }

  private async _fetchRepos(orgName: string, page: number, append = false) {
    const response = await this._apiStore.request<IGitHubRepoAPI[]>({
      method: HTTPMethod.GET,
      endpoint: ENDPOINTS.repositories.create(orgName),
      data: {},
      headers: {},
      params: { per_page: REPO_PER_PAGE, page },
    })

    runInAction(() => {
      if (!response.success || !response.data) {
        this._meta = MetaValues.ERROR
        return
      }

      const list = response.data.map(normilizeRepo)
      const newList = normilizeCollection(list, (i) => i.id)

      if (append) {
        this._list = normilizeCollection([...this.list, ...list], (i) => i.id)
      } else {
        this._list = newList
      }

      this._currentPage = page
      this._hasMore = list.length === REPO_PER_PAGE
      this._meta = MetaValues.SUCCESS
    })
  }

  destroy(): void {
    this._qpReaction()
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (searchTerm) => {
      const orgName =
        typeof searchTerm === "string" && searchTerm.length > 0
          ? searchTerm
          : "ktsstudio"
      this.getOrganizationReposList({ orgName })
    },
    { fireImmediately: true }
  )
}

export default GitHubStore
