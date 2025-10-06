import Image from "next/image"
import Link from "next/link"

import classNames from "classnames"

import Heading from "../Heading"
import styles from "./Logo.module.scss"

interface LogoProps {
  withTitle?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  withTitle = false,
  className,
}: LogoProps) => {
  return (
    <Link href="/" className={classNames(styles.logo, className)}>
      <Image src="/github.svg" width={32} height={32} alt="github logo" />
      {withTitle && (
        <Heading view="subtitle" weight="medium">
          GitHub Client
        </Heading>
      )}
    </Link>
  )
}

export default Logo
