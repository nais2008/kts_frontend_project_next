import React from "react"

import classNames from "classnames"

import styles from "./Heading.module.scss"

export type HeadingProps = {
  className?: string
  view?: "title" | "button" | "subtitle" | "desc" | "paragraph"
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span"
  weight?: "normal" | "medium" | "bold"
  children: React.ReactNode
  color?: "primary" | "secondary" | "accent"
  maxLines?: number
} & React.HTMLAttributes<HTMLHeadingElement>

const Heading: React.FC<HeadingProps> = ({
  className,
  view,
  tag = "p",
  weight,
  children,
  color,
  maxLines,
  ...props
}: HeadingProps) => {
  const Component = tag

  const classList: string[] = [styles.root]

  if (className) classList.push(className)

  if (view && styles[`view_${view}`]) classList.push(styles[`view_${view}`])

  if (weight && styles[`weight_${weight}`])
    classList.push(styles[`weight_${weight}`])

  if (color && styles[`color_${color}`])
    classList.push(styles[`color_${color}`])

  if (maxLines) classList.push(styles.ellipsis)

  const style = maxLines
    ? ({
        "--max-lines": maxLines,
        WebkitLineClamp: maxLines,
      } as React.CSSProperties)
    : {}

  return (
    <Component
      className={classNames(classList, styles.heading)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Heading
