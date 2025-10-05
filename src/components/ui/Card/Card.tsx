import React from "react"

import Image from "next/image"

import cn from "classnames"

import Heading from "@/components/ui/Heading"

import styles from "./Card.module.scss"

export type CardProps = {
  className?: string
  image: string
  captionSlot?: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  contentSlot?: React.ReactNode
  onClick?: React.MouseEventHandler
  actionSlot?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={cn(styles.card, className)} onClick={onClick}>
      <Image
        src={image}
        alt={image}
        className={styles.card__image}
        width={500}
        height={500}
      />
      <div className={styles.card__content}>
        <div className={styles.card__text}>
          {captionSlot && (
            <Heading
              className={styles.card__captionSlot}
              view="paragraph"
              color="secondary"
              weight="medium"
            >
              {captionSlot}
            </Heading>
          )}
          <Heading
            className={styles.card__title}
            view="desc"
            weight="medium"
            maxLines={2}
          >
            {title}
          </Heading>
          <Heading
            className={styles.card__subtitle}
            view="paragraph"
            color="secondary"
            maxLines={3}
          >
            {subtitle}
          </Heading>
        </div>
        <div className={styles.card__footer}>
          {contentSlot && (
            <Heading
              className={styles.card__contentSlot}
              view="desc"
              weight="bold"
            >
              {contentSlot}
            </Heading>
          )}
          {actionSlot && (
            <div className={styles.card__actionSlot}>{actionSlot}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
