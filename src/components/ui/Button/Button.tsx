import React from "react"

import cn from "classnames"

import Heading from "../Heading"
import styles from "./Button.module.scss"

export type ButtonProps = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(styles.btn, className)} {...props}>
      <Heading view="button">{children}</Heading>
    </button>
  )
}

export default Button
