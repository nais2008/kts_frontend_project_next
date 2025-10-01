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

type PrivateFields = "_list" | "_meta" | "_favorites"

class GitHubStore implements ILocalStore {
  private readonly _apiStore = new ApiStore()

  private _list: TCollectionMoldel<number, IGitHubRepoModel> =
    getInitialCollectionModel()
  private _meta: MetaValues = MetaValues.INITIAL
  private _favorites: IGitHubRepoModel[] = []

  constructor() {
    makeObservable<GitHubStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _favorites: observable.ref,
      list: computed,
      meta: computed,
      favorites: computed,
      getOrganizationReposList: action,
      toggleFavorite: action,
    })

    const favoritesFromStorage = localStorage.getItem(FAVORITES_KEY)
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

    const { orgName, page = 1, perPage = 9 } = params

    const response = await this._apiStore.request<IGitHubRepoAPI[]>({
      method: HTTPMethod.GET,
      endpoint: ENDPOINTS.repositories.create(orgName, perPage, page),
      data: {},
      headers: {},
    })

    runInAction(() => {
      if (!response.success || !response.data) {
        this._meta = MetaValues.ERROR
        return
      }

      try {
        const list = response.data.map(normilizeRepo)
        this._list = normilizeCollection(list, (i) => i.id)
        this._meta = MetaValues.SUCCESS
      } catch (e) {
        console.error(e)
        this._list = getInitialCollectionModel()
        this._meta = MetaValues.ERROR
      }
    })
  }

  destroy(): void {
    this._qpReaction()
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam("search"),
    (search) => {
      console.log(search)
    }
  )
}

export default GitHubStore
