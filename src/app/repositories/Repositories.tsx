"use client"

import React from "react"

import { useGitHubStore } from "@/providers/GutHubProvider"
import { MetaValues } from "@/shared/types/meta.type"
import { Star } from "lucide-react"
import { enableStaticRendering, observer } from "mobx-react-lite"

import Card from "@/components/ui/Card"
import Loader from "@/components/ui/Loader"

import { formatDate } from "@/utils/formatDate"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/config/routes.config"

enableStaticRendering(typeof window === "undefined")

type RepositoriesProps = {
  className?: string
}

const Repositories = observer(({ className }: RepositoriesProps) => {
  const router = useRouter()
  const store = useGitHubStore()

  console.log(store.meta)

  return (
    <div className={className}>
      {store.meta === MetaValues.LOADING &&
        Array.from({ length: 6 }).map((_, i) => <Loader key={i} size="l" />)}
      {store.list.map((repo) => (
        <Card
          key={repo.id}
          image={repo.owner.avatarURL}
          captionSlot={
            <>
              <Star color="#ff9432" size={16} />
              {repo.stargazersCount} Updated {formatDate(repo.lastUpdate)}
            </>
          }
          title={repo.name}
          subtitle={repo.description}
          onClick={() => {router.push(ROUTES.repository(
            repo.owner.login, repo.name,
          ))}}
        />
      ))}
    </div>
  )
})

export default Repositories
