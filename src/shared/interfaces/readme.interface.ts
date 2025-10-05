export interface IGitHubReadmeFileAPI {
  name: string
  content: string
  encoding: "base64" | string
  html_url: string
}

export interface IGitHubReadmeFileModel {
  name: string
  content: string
  encoding: "base64" | string
  htmlUrl: string
}

export const normilizeReadme = (
  from: IGitHubReadmeFileAPI
): IGitHubReadmeFileModel => ({
  name: from.name,
  content: from.content,
  encoding: from.encoding,
  htmlUrl: from.html_url,
})
