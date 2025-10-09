import {
  type IGitHubOwnerAPI,
  type IGitHubOwnerModel,
  normilizeOwner,
} from "./owner.interface"

export interface IGitHubRepoModel {
  id: number
  name: string
  description: string
  lastUpdate: Date
  stargazersCount: number
  watchersCount: number
  forksCount: number
  topics: string[]
  homepage: string | null
  owner: IGitHubOwnerModel
  htmlUrl: string | null
  strapiId?: number
}

export interface IGitHubRepoAPI {
  id: number
  name: string
  description: string
  stargazers_count: number
  updated_at: string
  owner: IGitHubOwnerAPI
  watchers_count: number
  forks_count: number
  topics: string[]
  homepage: string
  html_url: string | null
}

export const normilizeRepo = (repo: IGitHubRepoAPI): IGitHubRepoModel => ({
  id: repo.id,
  name: repo.name,
  description: repo.description || "",
  lastUpdate: new Date(repo.updated_at),
  stargazersCount: repo.stargazers_count,
  watchersCount: repo.watchers_count,
  forksCount: repo.forks_count,
  topics: repo.topics,
  homepage: repo.homepage,
  owner: normilizeOwner(repo.owner),
  htmlUrl: repo.html_url,
})
