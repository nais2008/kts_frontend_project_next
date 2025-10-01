export interface IGitHubOwnerAPI {
  login: string
  avatar_url: string
  html_url: string
}

export interface IGitHubOwnerModel {
  login: string
  avatarURL: string
  htmlURL: string
}

export const normilizeOwner = (from: IGitHubOwnerAPI): IGitHubOwnerModel => ({
  login: from.login,
  avatarURL: from.avatar_url,
  htmlURL: from.html_url,
})
