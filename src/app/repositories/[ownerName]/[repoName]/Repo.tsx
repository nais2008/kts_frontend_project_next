"use client"

import React, { useEffect } from "react"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

import { ROUTES } from "@/config/routes.config"
import { useRepoStore } from "@/providers/RepoProvider"
import { useTheme } from "@/providers/ThemeProvider"
import { MetaValues } from "@/shared/types/meta.type"
import classNames from "classnames"
import "github-markdown-css/github-markdown-dark.css"
import "github-markdown-css/github-markdown-light.css"
import { ChevronLeft, Link as IconLink } from "lucide-react"
import { observer } from "mobx-react-lite"

import Heading from "@/components/ui/Heading"
import Loader from "@/components/ui/Loader"

import RepositoryContributors from "./components/RepositoryContributors"
import RepositoryLanguages from "./components/RepositoryLanguages"
import RepositoryStats from "./components/RepositoryStats"
import styles from "./page.module.scss"

type ParamsProps = {
  ownerName: string
  repoName: string
}

const Repo: React.FC = observer(() => {
  const store = useRepoStore()
  const { ownerName, repoName } = useParams<ParamsProps>()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (ownerName && repoName) {
      store.fetchRepoData(ownerName, repoName)
    }
  }, [ownerName, repoName, store])

  if (store.meta === MetaValues.LOADING) {
    return <Loader size="l" />
  }

  if (store.meta === MetaValues.ERROR) {
    return (
      <div className={styles.repository__error}>Ошибка загрузки данных</div>
    )
  }

  return (
    <>
      <section className={styles.repository__statsSection}>
        <div className={styles.repository__header}>
          <Link href={ROUTES.repositories()}>
            <ChevronLeft size={32} color="#1f883d" />
          </Link>
          <div className={styles.repository__titleLink}>
            {store.repoData?.owner.avatarURL && (
              <Image
                src={store.repoData.owner.avatarURL}
                alt="Repo Avatar"
                className={styles.repository__avatar}
                width={40}
                height={40}
              />
            )}
            <Heading view="title" className={styles.repository__title}>
              {store.repoData?.name}
            </Heading>
          </div>
        </div>

        {store.repoData?.homepage && (
          <a
            className={styles.repository__homepage}
            href={store.repoData.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLink />
            <Heading weight="bold">{store.repoData.homepage}</Heading>
          </a>
        )}

        <div className={styles.repository__tags}>
          {store.repoData?.topics?.map((topic) => (
            <Heading
              weight="medium"
              tag="span"
              view="paragraph"
              key={topic}
              className={styles.tag}
            >
              {topic}
            </Heading>
          ))}
        </div>

        <RepositoryStats
          stars={store.repoData?.stargazersCount ?? 0}
          watchers={store.repoData?.watchersCount ?? 0}
          forks={store.repoData?.forksCount ?? 0}
        />

        <div className={styles.repository__info}>
          <RepositoryContributors contributors={store.contributors} />
          <RepositoryLanguages languages={store.languages} />
        </div>
      </section>

      {store.readmeHtml && (
        <div className={styles.repository__readme}>
          <Heading weight="bold">README.md</Heading>
          <div
            className={classNames(
              "markdown-body",
              resolvedTheme === "dark"
                ? styles.repository__markdownDark
                : styles.repository__markdownLight
            )}
            dangerouslySetInnerHTML={{ __html: store.readmeHtml }}
          />
        </div>
      )}
    </>
  )
})

export default Repo
