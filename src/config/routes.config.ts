export const ROUTES = {
  home: () => "/",
  repositories: () => "/repositories",
  repository: (owner: string, repoName: string) =>
    `/repositories/${owner}/${repoName}`,
  favorite: () => "/favorite",
}
