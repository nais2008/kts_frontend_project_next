import React from "react"

import Heading from "@/components/ui/Heading"

import styles from "./Error.module.scss"

interface ErrorProps {
  error: string | undefined
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <>
      {error && (
        <Heading tag="p" weight="bold" className={styles.error}>
          {error}
        </Heading>
      )}
    </>
  )
}

export default React.memo(Error)
