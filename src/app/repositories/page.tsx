import type { Metadata } from "next"

import { StoreProvider } from "@/providers/RootProvider"

import styles from "./page.module.scss"

export const metadata: Metadata = {
  title: "Repositories",
  description: "repositories page front-end project kts",
}

function RepositoriesPage() {
  return (
    <StoreProvider>
      <div className={styles.repositories__container}></div>
    </StoreProvider>
  )
}

export default RepositoriesPage
