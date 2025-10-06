"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { HEADER_ITEMS } from "@/data/header.data"
import classNames from "classnames"
import { match } from "path-to-regexp"

import styles from "./Menu.module.scss"

interface MenuProps {
  className?: string
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const pathname = usePathname()

  return (
    <nav className={classNames(styles.menu, className)}>
      {HEADER_ITEMS.map((item) => (
        <Link
          href={item.link()}
          key={item.name}
          className={
            !!match(item.link())(pathname)
              ? styles.menu__item_active
              : styles.menu__item
          }
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

export default Menu
