"use client"

import React from "react"

import { useGitHubStore } from "@/providers/GutHubProvider"
import { IGitHubRepoModel } from "@/shared/interfaces/repository.interface"
import { observer } from "mobx-react-lite"

import FavoriteCard from "@/components/ui/FavoriteCard"

interface FavoriteProps {
  className?: string
}

const Favorite = observer(({ className }: FavoriteProps) => {
  const store = useGitHubStore()
  const [isRemoving, setIsRemoving] = React.useState(false)

  const handleToggleFavorite = (
    e: React.MouseEvent,
    repo: IGitHubRepoModel
  ) => {
    e.stopPropagation()
    setIsRemoving(true)
    store.toggleFavorite(repo)
    setTimeout(() => setIsRemoving(false), 200)
  }

  if (!store.favorites.length) {
    return <p>Нет избранных репозиториев 💔</p>
  }

  return (
    <div className={className}>
      {store.favorites.map((repo) => (
        <FavoriteCard
          key={repo.id}
          repo={repo}
          isRemoving={isRemoving}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  )
})

export default Favorite
