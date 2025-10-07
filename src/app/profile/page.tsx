import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { IGitHubRepoAPI } from "@/shared/interfaces/repository.interface"

export const metadata: Metadata = {
  title: "Мои Репозитории GitHub",
  description: "Список репозиториев авторизованного пользователя.",
}

async function fetchUserRepos(accessToken: string): Promise<IGitHubRepoAPI[]> {
  const response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    console.error(`GitHub API error: ${response.statusText}`)
    return []
  }

  return response.json()
}

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    redirect("/")
  }

  const repos = await fetchUserRepos(session.accessToken)

  console.log(repos)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Ваши репозитории GitHub ({repos.length})
      </h1>
      <ul className="space-y-2">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <li key={repo.id} className="p-3 border rounded shadow-sm">
              <a
                href={repo.html_url ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                {repo.name}
              </a>
            </li>
          ))
        ) : (
          <p>
            Не удалось найти репозитории или вы не предоставили необходимые
            разрешения.
          </p>
        )}
      </ul>
    </div>
  )
}
