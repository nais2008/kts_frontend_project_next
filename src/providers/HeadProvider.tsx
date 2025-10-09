"use client"

import React from "react"

import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from "./ThemeProvider"

interface HeadProviderProps {
  children: React.ReactNode
}

const HeadProvider: React.FC<HeadProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  )
}

export default HeadProvider
