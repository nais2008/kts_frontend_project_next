"use client"

import React from "react"

import rootStore from "@/store/RootStore/instance"

const StoreContext = React.createContext(rootStore)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  )
}

export const useRootStore = () => React.useContext(StoreContext)
