import React from "react"

import cn from "classnames"

import styles from "./Loader.module.scss"

const LoaderSize = {
  L: "l",
  S: "s",
}

type LoaderSize = (typeof LoaderSize)[keyof typeof LoaderSize]

export type LoaderProps = {
  className?: string
  size: LoaderSize
}

const Loader: React.FC<LoaderProps> = ({ className, size }) => {
  return (
    <div
      className={cn(className, styles.loader, {
        [styles.loader_small]: size === "s",
        [styles.loader_large]: size === "l",
      })}
    >
      <div className={styles.loader__image}></div>
      <div className={styles.loader__container}>
        <div className={styles.loader__title}></div>
        <div className={styles.loader__text}></div>
      </div>
    </div>
  )
}

export default Loader
