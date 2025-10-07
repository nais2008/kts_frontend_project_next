"use client"

import React from "react"

import { SessionProvider } from "next-auth/react"

interface HeadProviderProps {
  children: React.ReactNode
}

const HeadProvider: React.FC<HeadProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default HeadProvider
