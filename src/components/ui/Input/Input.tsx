import React from "react"

import cn from "classnames"

import styles from "./Input.module.scss"

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string
  onChange: (value: string) => void
  afterSlot?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, ...props }, ref) => {
    const handlerChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event.target.value)
        }
      },
      [onChange]
    )

    return (
      <div className={styles.input__wrapper}>
        <input
          ref={ref}
          {...props}
          onChange={handlerChange}
          value={value}
          className={cn(styles.input__field, className)}
          type="text"
        />
        {afterSlot && (
          <div className={styles.input__afterSlot}>{afterSlot}</div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
