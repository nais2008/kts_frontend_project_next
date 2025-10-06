import Image from "next/image"

import Logo from "@/components/ui/Logo"

import Menu from "../Menu"
import styles from "./Header.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo withTitle className={styles.header__logo} />
        <Menu className={styles.header__navigation} />
        {/* <Button>Continue with GitHub</Button> */}
        <Image
          src="https://thispersondoesnotexist.com/"
          width={32}
          height={32}
          alt="picsum.photos"
          priority
          className={styles.header__avatar}
        />
      </div>
    </header>
  )
}

export default Header
