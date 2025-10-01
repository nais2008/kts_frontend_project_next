export const ENDPOINTS = {
  repositories: {
    create: (
      org: string,
      perPage: number,
      page: number,
      type: string = "all"
    ) => `/orgs/${org}/repos?type=${type}&per_page=${perPage}&page=${page}`,
  },
  repository: {
    info: {
      create: (owner: string, repoName: string) =>
        `/repos/${owner}/${repoName}`,
    },
    languages: {
      create: (owner: string, repoName: string) =>
        `/repos/${owner}/${repoName}/languages`,
    },
    contributors: {
      create: (owner: string, repoName: string) =>
        `/repos/${owner}/${repoName}/contributors`,
    },
    readme: {
      create: (owner: string, repoName: string) =>
        `/repos/${owner}/${repoName}/readme`,
    },
  },
}
