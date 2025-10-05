import type { Metadata } from "next"

import classNames from "classnames"

import Heading from "@/components/ui/Heading"

import Index from "./Index"
import styles from "./page.module.scss"

export const metadata: Metadata = {
  title: "Homepage",
  description: "homepage front-end project kts",
}

export default function Page() {
  return (
    <div className={classNames(styles.index__container, styles.index)}>
      <Heading view="title" tag="h1" className={styles.index__title}>
        Welcome to <span>GitHub Client</span>
      </Heading>

      <Index />
    </div>
  )
}
