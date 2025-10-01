"use client"

import React from "react"

import { useRouter } from "next/router"

import { ROUTES } from "@/config/routes.config"
import type { IGitHubRepoModel } from "@/shared/interfaces/repository.interface"
import { Heart, Star } from "lucide-react"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

interface FavoriteCardProps {
  repo: IGitHubRepoModel
  isRemoving: boolean
  onToggleFavorite: (e: React.MouseEvent, repo: IGitHubRepoModel) => void
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  repo,
  isRemoving,
  onToggleFavorite,
}) => {
  const router = useRouter()

  return (
    <Card
      key={repo.id}
      image={repo.owner.avatarURL}
      captionSlot={
        <>
          <Star color="#ff9432" size={16} />
          {repo.stargazersCount}
        </>
      }
      title={repo.name}
      subtitle={repo.description}
      onClick={() =>
        router.push(ROUTES.repository(repo.owner.login, repo.name))
      }
      actionSlot={
        <Button
          onClick={(e) => onToggleFavorite(e, repo)}
          disabled={isRemoving}
        >
          <Heart
            size={20}
            color={isRemoving ? "#ffffff" : "#ffc700"}
            fill={isRemoving ? "none" : "#ffc700"}
            style={{ transition: "fill 0.2s, color 0.2s" }}
          />
        </Button>
      }
    />
  )
}

export default FavoriteCard
