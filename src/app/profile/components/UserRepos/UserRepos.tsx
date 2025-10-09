"use client"

import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"

import { useUserReposStore } from "@/providers/UserReposProvider"
import { MetaValues } from "@/shared/types/meta.type"
import { Star } from "lucide-react"
import { enableStaticRendering, observer } from "mobx-react-lite"

import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Loader from "@/components/ui/Loader"

import { formatDate } from "@/utils/formatDate"

enableStaticRendering(typeof window === "undefined")

type RepositoriesProps = {
  className?: string
}

const UserRepos = observer(({ className }: RepositoriesProps) => {
  const store = useUserReposStore()

  const repositoriesMessage =
    store.list.length > 0 ? (
      <Heading tag="p">🎉 Все репозитории загружены</Heading>
    ) : (
      <Heading tag="p">Нет репозиториев :(</Heading>
    )

  const loader = Array.from({ length: 6 }).map((_, i) => (
    <Loader key={i} size="s" />
  ))

  if (store.meta === MetaValues.ERROR) {
    return <p>Ничего не найдено :(</p>
  }

  if (store.meta === MetaValues.INITIAL && store.list.length === 0) {
    return <Loader size="l" />
  }

  return (
    <InfiniteScroll
      dataLength={store.list.length}
      next={() => store.getMoreRepos()}
      hasMore={store.hasMore}
      loader={loader}
      scrollThreshold={0.9}
      className={className}
      endMessage={repositoriesMessage}
      style={{ overflow: "visible" }}
    >
      {store.list.map((repo) => {
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
            onClick={() => window.open(repo.htmlUrl ?? "", "_blank")}
          />
        )
      })}
    </InfiniteScroll>
  )
})

export default UserRepos
