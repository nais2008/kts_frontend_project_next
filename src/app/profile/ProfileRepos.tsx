"use client"

import { useState } from "react"
import React from "react"

import { UserReposStoreContextProvider } from "@/providers/UserReposProvider"

import Modal from "@/components/layout/Modal"
import Button from "@/components/ui/Button"

import CreateRepoForm from "./components/CreateRepoForm"
import SearchBar from "./components/SearchBar"
import UserRepos from "./components/UserRepos"
import styles from "./page.module.scss"

interface ProfileReposProps {
  accessToken: string
}

function ProfileRepos({ accessToken }: ProfileReposProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = React.useCallback(() => setIsModalOpen(true), [])
  const closeModal = React.useCallback(() => setIsModalOpen(false), [])

  return (
    <UserReposStoreContextProvider accessToken={accessToken}>
      <Button onClick={openModal} className={styles.profile__btn}>
        Создать репозиторий
      </Button>

      <SearchBar />
      {isModalOpen && (
        <Modal title="Создание репозитория" onClose={closeModal}>
          <CreateRepoForm onRepoCreated={closeModal} />
        </Modal>
      )}

      <UserRepos className={styles.profile__repos} />
    </UserReposStoreContextProvider>
  )
}

export default ProfileRepos
