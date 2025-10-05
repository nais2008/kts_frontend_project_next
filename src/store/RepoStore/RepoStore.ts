import { ENDPOINTS } from "@/constants/endpoints"
import type { ILocalStore } from "@/shared/interfaces/localStore.interface"
import {
  type IGitHubOwnerAPI,
  type IGitHubOwnerModel,
  normilizeOwner,
} from "@/shared/interfaces/owner.interface"
import {
  type IGitHubReadmeFileAPI,
  normilizeReadme,
} from "@/shared/interfaces/readme.interface"
import {
  type IGitHubRepoAPI,
  type IGitHubRepoModel,
  normilizeRepo,
} from "@/shared/interfaces/repository.interface"
import { HTTPMethod } from "@/shared/types/httpMethod.type"
import { MetaValues } from "@/shared/types/meta.type"
import ApiStore from "@/store/ApiStore"
import { action, computed, makeObservable, observable, runInAction } from "mobx"

import { parseReadmeToHtml } from "@/utils/parseReadmeToHtml"

type PrivateFields =
  | "_repoData"
  | "_languages"
  | "_contributors"
  | "_readmeHtml"
  | "_meta"

class RepoStore implements ILocalStore {
  private readonly _apiStore = new ApiStore()

  private _repoData: IGitHubRepoModel | null = null
  private _languages: Record<string, number> = {}
  private _contributors: IGitHubOwnerModel[] = []
  private _readmeHtml: string | null = null
  private _meta: MetaValues = MetaValues.INITIAL

  constructor() {
    makeObservable<RepoStore, PrivateFields>(this, {
      _repoData: observable,
      _languages: observable,
      _contributors: observable,
      _readmeHtml: observable,
      _meta: observable,
      repoData: computed,
      languages: computed,
      contributors: computed,
      readmeHtml: computed,
      meta: computed,
      fetchRepoData: action,
    })
  }

  get repoData(): IGitHubRepoModel | null {
    return this._repoData
  }

  get languages(): Record<string, number> {
    return this._languages
  }

  get contributors(): IGitHubOwnerModel[] {
    return this._contributors
  }

  get readmeHtml(): string | null {
    return this._readmeHtml
  }

  get meta(): MetaValues {
    return this._meta
  }

  async fetchRepoData(owner: string, repoName: string): Promise<void> {
    this._meta = MetaValues.LOADING

    try {
      const [repoRes, languagesRes, contributorsRes, readmeRes] =
        await Promise.all([
          this._apiStore.request<IGitHubRepoAPI>({
            method: HTTPMethod.GET,
            endpoint: ENDPOINTS.repository.info.create(owner, repoName),
          }),
          this._apiStore.request<Record<string, number>>({
            method: HTTPMethod.GET,
            endpoint: ENDPOINTS.repository.languages.create(owner, repoName),
          }),
          this._apiStore.request<IGitHubOwnerAPI[]>({
            method: HTTPMethod.GET,
            endpoint: ENDPOINTS.repository.contributors.create(owner, repoName),
          }),
          this._apiStore.request<IGitHubReadmeFileAPI>({
            method: HTTPMethod.GET,
            endpoint: ENDPOINTS.repository.readme.create(owner, repoName),
          }),
        ])

      if (
        !repoRes.success ||
        !languagesRes.success ||
        !contributorsRes.success
      ) {
        runInAction(() => {
          this._meta = MetaValues.ERROR
        })
        return
      }

      let readmeHtml: string | null = null
      if (readmeRes.success && readmeRes.data) {
        const normalizedReadme = normilizeReadme(readmeRes.data)
        readmeHtml = await parseReadmeToHtml(normalizedReadme)
      }

      runInAction(() => {
        this._repoData = normilizeRepo(repoRes.data!)
        this._languages = languagesRes.data!
        this._contributors = contributorsRes.data!.map(normilizeOwner)
        this._readmeHtml = readmeHtml
        this._meta = MetaValues.SUCCESS
      })
    } catch (e) {
      runInAction(() => {
        console.error(e)
        this._meta = MetaValues.ERROR
      })
    }
  }

  destroy(): void {}
}

export default RepoStore
