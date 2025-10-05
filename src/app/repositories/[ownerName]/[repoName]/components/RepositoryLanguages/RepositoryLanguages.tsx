import React from "react"

import Heading from "@/components/ui/Heading"

import { generateLanguageProcentage } from "@/utils/generateLanguageProcentage"
import { getLangColor } from "@/utils/setLangColor"

import styles from "./RepositoryLanguages.module.scss"

type RepositoryLanguagesProps = {
  languages: Record<string, number>
}

const RepositoryLanguages: React.FC<RepositoryLanguagesProps> = ({
  languages,
}) => (
  <div className={styles.repository__languages}>
    <Heading tag="h2">Languages</Heading>
    <div className={styles.repository__2line}>
      {Object.keys(languages).map((lang) => (
        <div key={lang} className={styles.repository__language}>
          <div
            className={styles.language__color}
            style={{ "--langColor": getLangColor(lang) } as React.CSSProperties}
          />
          <Heading view="paragraph" color="primary" weight="medium">
            {lang}
          </Heading>
          <Heading view="paragraph" color="secondary">
            {generateLanguageProcentage(languages[lang], languages)}%
          </Heading>
        </div>
      ))}
    </div>
  </div>
)

export default RepositoryLanguages
