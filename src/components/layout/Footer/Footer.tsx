import Link from "next/link"

import { ROUTES } from "@/config/routes.config"

import Heading from "@/components/ui/Heading"

import styles from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Heading view="paragraph" weight="medium" color="secondary">
          © GitHubClient 2025 - {new Date().getFullYear()}
        </Heading>
        <nav>
          <ul>
            <li>
              <Link href={ROUTES.repositories()}>Go to Repo</Link>
            </li>
            <li>
              <Link href={ROUTES.favorite()}>Go to Favorite</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
