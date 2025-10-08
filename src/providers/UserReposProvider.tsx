"use client"

import React, { useEffect } from "react"

import { useLocalStore } from "@/hooks/useLocalStore"
import { useStrictContext } from "@/hooks/useStrictContext"
import UserReposStore from "@/store/UserReposStore"

const UserReposStoreContext = React.createContext<UserReposStore | null>(null)

interface UserReposStoreContextProviderProps {
  children: React.ReactNode
  accessToken: string
}

export const UserReposStoreContextProvider: React.FC<
  UserReposStoreContextProviderProps
> = ({ children, accessToken }) => {
  const store = useLocalStore(() => new UserReposStore())
  useEffect(() => {
    if (accessToken) {
      store.init(accessToken)
    }
  }, [accessToken, store])

  return (
    <UserReposStoreContext.Provider value={store}>
      {children}
    </UserReposStoreContext.Provider>
  )
}

export const useUserReposStore = () => {
  return useStrictContext({
    context: UserReposStoreContext,
    message: "UserReposStoreContext was not provided",
  })
}
