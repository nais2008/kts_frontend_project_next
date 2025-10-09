"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { HEADER_ITEMS } from "@/data/header.data"
import classNames from "classnames"
import { MenuIcon } from "lucide-react"
import { match } from "path-to-regexp"

import styles from "./Menu.module.scss"

interface MenuProps {
  className?: string
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [clientPath, setClientPath] = useState<string | null>(null)

  useEffect(() => {
    setClientPath(pathname)

    if (!isOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, pathname])

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <nav className={classNames(styles.menu, className)} ref={menuRef}>
      <button
        className={styles.menu__toggle}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <MenuIcon />
      </button>

      <div
        className={classNames(styles.menu__list, {
          [styles.menu__list_open]: isOpen,
        })}
      >
        {HEADER_ITEMS.map((item) => {
          const isActive = clientPath && !!match(item.link())(clientPath ?? "")

          return (
            <Link
              href={item.link()}
              key={item.name}
              className={classNames(styles.menu__item, {
                [styles.menu__item_active]: isActive,
              })}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Menu
