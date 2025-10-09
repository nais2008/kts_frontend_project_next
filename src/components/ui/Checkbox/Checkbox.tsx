import React from "react"

import cn from "classnames"

import Heading from "../Heading"
import styles from "./Checkbox.module.scss"

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: React.ReactNode
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className={cn(styles.checkbox__wrapper, className)}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.checkbox__input}
          {...props}
        />
        <span className={styles.checkbox__indicator} />

        <Heading tag="span" className={styles.checkbox__label}>
          {label}
        </Heading>
      </label>
    )
  }
)

Checkbox.displayName = "Checkbox"

export default Checkbox
