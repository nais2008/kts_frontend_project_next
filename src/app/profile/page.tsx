import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { UserReposStoreContextProvider } from "@/providers/UserReposProvider"

import Heading from "@/components/ui/Heading"

import ProfileRepos from "./ProfileRepos"
import styles from "./page.module.scss"

export default async function Page() {
  const session = await getServerSession(authOptions)
  const accessToken = session?.accessToken || ""

  return (
    <UserReposStoreContextProvider accessToken={session?.accessToken || ""}>
      <section className={styles.profile__container}>
        <Heading view="title" tag="h1" className={styles.profile__title}>
          Your repositories
        </Heading>
        <ProfileRepos accessToken={accessToken} />
      </section>
    </UserReposStoreContextProvider>
  )
}
