import React from "react"

import Image from "next/image"

import type { IGitHubOwnerModel } from "@/shared/interfaces/owner.interface"

import Heading from "@/components/ui/Heading"

import styles from "./RepositoryContributors.module.scss"

type RepositoryContributorsProps = {
  contributors: IGitHubOwnerModel[]
}

const RepositoryContributors: React.FC<RepositoryContributorsProps> = ({
  contributors,
}) => (
  <div className={styles.repository__contributors}>
    <Heading tag="h2">Contributors</Heading>
    <div className={styles.repository__2line}>
      {contributors.map((contributor) => (
        <a
          href={contributor.htmlURL}
          key={contributor.login}
          className={styles.repository__contributor}
        >
          <Image
            src={contributor.avatarURL}
            alt={contributor.login}
            className={styles.contributor__avatar}
            width={32}
            height={32}
          />
          <Heading
            view="paragraph"
            color="primary"
            weight="medium"
            className={styles.contributor__name}
          >
            {contributor.login}
          </Heading>
        </a>
      ))}
    </div>
  </div>
)

export default RepositoryContributors
