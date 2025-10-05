import React from "react"

import type { Metadata } from "next"

import { GitHubStoreContextProvider } from "@/providers/GutHubProvider"

import Heading from "@/components/ui/Heading"

import Favorite from "./Favorite"
import styles from "./page.module.scss"

export const metadata: Metadata = {
  title: "Favorite",
  description: "Favorite repositories GitHub Client",
}

function Page() {
  return (
    <GitHubStoreContextProvider>
      <Heading view="title" tag="h1" className={styles.favorites__title}>
        Избранные репозитории
      </Heading>
      <div className={styles.favorites__container}>
        <Favorite className={styles.favorites} />
      </div>
    </GitHubStoreContextProvider>
  )
}

export default Page
