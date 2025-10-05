"use client"

import React from "react"

import { useLocalStore } from "@/hooks/useLocalStore"
import { useStrictContext } from "@/hooks/useStrictContext"
import RepoStore from "@/store/RepoStore"

const RepoStoreContext = React.createContext<RepoStore | null>(null)

interface RepoStoreContextProviderProps {
  children: React.ReactNode
}

export const RepoStoreContextProvider: React.FC<
  RepoStoreContextProviderProps
> = ({ children }) => {
  const store = useLocalStore(() => new RepoStore())

  return (
    <RepoStoreContext.Provider value={store}>
      {children}
    </RepoStoreContext.Provider>
  )
}

export const useRepoStore = () => {
  return useStrictContext({
    context: RepoStoreContext,
    message: "RepoStoreContext was not provided",
  })
}
