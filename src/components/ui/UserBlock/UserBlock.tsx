"use client"

import React from "react"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

import classNames from "classnames"

import Button from "../Button"
import Logo from "../Logo"
import styles from "./UserBlock.module.scss"

interface UserBlockProps {
  className?: string
}

const UserBlock: React.FC<UserBlockProps> = ({ className }) => {
  const { data, status } = useSession()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement | null>(null)

  const user = data?.user
  const isAuthenticated = status === "authenticated"

  const toggleMenu = React.useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = React.useCallback(() => setMenuOpen(false), [])

  React.useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [closeMenu, menuOpen])

  return (
    <>
      {isAuthenticated ? (
        <div className={classNames(className, styles.userBlock)} ref={menuRef}>
          <Image
            src={user?.image ?? "/default-avatar.png"}
            width={32}
            height={32}
            alt={user?.name ?? "User"}
            priority
            className={styles.userBlock__avatar}
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className={styles.userBlock__menu}>
              <Link
                href="/profile"
                className={styles.userBlock__menuItem}
                onClick={closeMenu}
              >
                Профиль
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" })
                  closeMenu()
                }}
                className={styles.userBlock__menuItem}
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={() => signIn("github")}
          className={styles.userBlock__gitHubBtn}
          isPrimary
        >
          <Logo /> Continue with GitHub
        </Button>
      )}
    </>
  )
}

export default UserBlock
