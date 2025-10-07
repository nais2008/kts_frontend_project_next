import React from "react"

import cn from "classnames"

import Heading from "../Heading"
import styles from "./Button.module.scss"

export type ButtonProps = {
  children: React.ReactNode
  isPrimary?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isPrimary,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles.btn, { [styles.btn_primary]: isPrimary }, className)}
      {...props}
    >
      <Heading view="button">{children}</Heading>
    </button>
  )
}

export default Button
