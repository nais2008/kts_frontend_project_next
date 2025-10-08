"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import rootStore from "@/store/RootStore"

import DropDown from "@/components/ui/DropDown"

const SearchBar: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialType = searchParams.get("type") || "all"
  const [repoType, setRepoType] = useState(initialType)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (repoType && repoType !== "all") {
      params.set("type", repoType)
    } else {
      params.delete("type")
    }

    const newUrl = `${pathname}?${params.toString()}`
    router.push(newUrl, { scroll: false })

    if (rootStore.query) {
      const searchString = newUrl.split("?")[1] || ""
      rootStore.query.setSearch(searchString)
    }
  }, [repoType, router, pathname, searchParams])

  return (
    <DropDown
      value={repoType}
      onChange={setRepoType}
      options={[
        { label: "Все", value: "all" },
        { label: "Создатель", value: "owner" },
        { label: "Публичные", value: "public" },
        { label: "Приватные", value: "private" },
        { label: "Участник", value: "member" },
      ]}
    />
  )
}

export default SearchBar
