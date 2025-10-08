import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { UserReposStoreContextProvider } from "@/providers/UserReposProvider"

import Heading from "@/components/ui/Heading"

import SearchBar from "./SearchBar"
import UserRepos from "./UserRepos"
import styles from "./page.module.scss"

export default async function Page() {
  const session = await getServerSession(authOptions)

  return (
    <UserReposStoreContextProvider accessToken={session?.accessToken || ""}>
      <section className={styles.profile__container}>
        <Heading view="title" tag="h1" className={styles.profile__title}>
          Your repositories
        </Heading>
        <SearchBar />
        <UserRepos className={styles.profile__repos} />
      </section>
    </UserReposStoreContextProvider>
  )
}
