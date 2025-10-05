import type { Metadata } from "next"

import { GitHubStoreContextProvider } from "@/providers/GutHubProvider"

import Repositories from "./Repositories"
import SearchBar from "./SearchBar"
import styles from "./page.module.scss"

export const metadata: Metadata = {
  title: "Repositories",
  description: "repositories page front-end project kts",
}

function RepositoriesPage() {
  return (
    <GitHubStoreContextProvider>
      <div className={styles.repositories__container}>
        <SearchBar />
        <Repositories className={styles.repositories} />
      </div>
    </GitHubStoreContextProvider>
  )
}

export default RepositoriesPage
