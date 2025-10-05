"use client"

import React from "react"

import { useLocalStore } from "@/hooks/useLocalStore"
import { useStrictContext } from "@/hooks/useStrictContext"
import GitHubStore from "@/store/GitHubStore"

const GitHubStoreContext = React.createContext<GitHubStore | null>(null)

interface GitHubStoreContextProviderProps {
  children: React.ReactNode
}

export const GitHubStoreContextProvider: React.FC<
  GitHubStoreContextProviderProps
> = ({ children }) => {
  const store = useLocalStore(() => new GitHubStore())

  return (
    <GitHubStoreContext.Provider value={store}>
      {children}
    </GitHubStoreContext.Provider>
  )
}

export const useGitHubStore = () => {
  return useStrictContext({
    context: GitHubStoreContext,
    message: "GitHubStoreContext was not provided",
  })
}
