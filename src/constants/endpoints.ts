export const ENDPOINTS = {
  userRepositories: {
    create: () => `/user/repos`,
  },
  repositories: {
    create: (org: string) => `/orgs/${org}/repos`,
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
