import type { Metadata } from "next"

import { RepoStoreContextProvider } from "@/providers/RepoProvider"

import Repo from "./Repo"
import styles from "./page.module.scss"

interface Params {
  ownerName: string
  repoName: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const endParams = await params

  return {
    title: `@${endParams.ownerName}/${endParams.repoName}`,
    description: `${endParams.repoName} by ${endParams.ownerName} GitHub Client`,
  }
}

export default function Page() {
  return (
    <RepoStoreContextProvider>
      <div className={styles.repository__container}>
        <Repo />
      </div>
    </RepoStoreContextProvider>
  )
}
