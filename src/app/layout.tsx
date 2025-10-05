import type { Metadata } from "next"
import { Montserrat } from "next/font/google"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"

import "./globals.scss"

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "%s | GitHub Client",
    default: "",
  },
  description: "Front-end project kts",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={montserratSans.variable}>
        <div id="root">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
