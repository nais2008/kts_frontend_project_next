"use client"

import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"

import { useRouter } from "next/navigation"

import { ROUTES } from "@/config/routes.config"
import { useGitHubStore } from "@/providers/GutHubProvider"
import { MetaValues } from "@/shared/types/meta.type"
import { Heart, Star } from "lucide-react"
import { enableStaticRendering, observer } from "mobx-react-lite"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Loader from "@/components/ui/Loader"

import { formatDate } from "@/utils/formatDate"

enableStaticRendering(typeof window === "undefined")

type RepositoriesProps = {
  className?: string
}

const Repositories = observer(({ className }: RepositoriesProps) => {
  const router = useRouter()
  const store = useGitHubStore()

  if (store.meta === MetaValues.ERROR) {
    return <p>Ничего не найдено :(</p>
  }

  return (
    <InfiniteScroll
      dataLength={store.list.length}
      next={() => store.getMoreRepos()}
      hasMore={store.hasMore}
      loader={Array.from({ length: 6 }).map((_, i) => (
        <Loader key={i} size="s" />
      ))}
      scrollThreshold={0.9}
      className={className}
      endMessage={
        store.list.length > 0 ? (
          <p>🎉 Все репозитории загружены</p>
        ) : (
          <p>Нет репозиториев :(</p>
        )
      }
    >
      {store.list.map((repo) => {
        const isFav = store.isFavorite(repo.id)
        return (
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
            onClick={() =>
              router.push(ROUTES.repository(repo.owner.login, repo.name))
            }
            actionSlot={
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  store.toggleFavorite(repo)
                }}
              >
                <Heart
                  size={20}
                  color={isFav ? "#ffc700" : "#ccc"}
                  fill={isFav ? "#ffc700" : "none"}
                  style={{ transition: "fill 0.2s, color 0.2s" }}
                />
              </Button>
            }
          />
        )
      })}
    </InfiniteScroll>
  )
})

export default Repositories
