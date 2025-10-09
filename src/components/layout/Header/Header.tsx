import React from "react"

import Logo from "@/components/ui/Logo"
import ThemeSwitcher from "@/components/ui/ThemeSwitcher"
import UserBlock from "@/components/ui/UserBlock"

import Menu from "../Menu"
import styles from "./Header.module.scss"

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo withTitle className={styles.header__logo} />
        <Menu className={styles.header__navigation} />
        <div className={styles.header__rightBlock}>
          <ThemeSwitcher />
          <UserBlock />
        </div>
      </div>
    </header>
  )
}

export default Header
