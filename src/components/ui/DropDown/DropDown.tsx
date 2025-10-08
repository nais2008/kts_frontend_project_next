"use client"

import React from "react"

import classNames from "classnames"
import { ChevronDown, ChevronUp } from "lucide-react"

import Heading from "../Heading"
import styles from "./DropDown.module.scss"

interface DropdownOption {
  value: string
  label: string
}

interface DropDownProps {
  options?: DropdownOption[]
  value: string
  onChange: (value: string) => void
}

const DropDown: React.FC<DropDownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const selectRef = React.useRef<HTMLDivElement | null>(null)

  const selectedOption =
    options?.find((option: DropdownOption) => option.value === value) ||
    options?.[0]

  React.useEffect(() => {
    const handleClickOutside = (
      event: React.MouseEvent | globalThis.MouseEvent
    ) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside as (e: globalThis.MouseEvent) => void
    )
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside as (e: globalThis.MouseEvent) => void
      )
  }, [])

  const handleOptionClick = React.useCallback(
    (optionValue: string) => {
      onChange(optionValue)
      setIsOpen(false)
    },
    [onChange]
  )

  return (
    <div className={styles.dropDown} ref={selectRef}>
      <div
        className={styles.dropDown__btn}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        {selectedOption?.label}
        <Heading tag="span">{isOpen ? <ChevronUp /> : <ChevronDown />}</Heading>
      </div>

      {isOpen && (
        <div className={styles.dropDown__options}>
          {options?.map((option: DropdownOption) => (
            <div
              key={option.value}
              className={classNames(styles.dropDown__option, {
                [styles.dropDown__option_active]: option.value === value,
              })}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropDown
