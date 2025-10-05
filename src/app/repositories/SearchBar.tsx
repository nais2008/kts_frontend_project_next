"use client"

import React, { useEffect, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useDebounce } from "@/hooks/useDebounce"
import rootStore from "@/store/RootStore"

import Search from "@/components/ui/Search"

const SearchBar: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get("search") || ""
  const [inputValue, setInputValue] = useState(initialQuery)

  const debouncedSearchTerm = useDebounce(inputValue, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearchTerm) {
      params.set("search", debouncedSearchTerm)
    } else {
      params.delete("search")
    }

    const newUrl = `${pathname}?${params.toString()}`

    router.push(newUrl, { scroll: false })

    if (rootStore.query) {
      const searchString = newUrl.split("?")[1] || ""
      rootStore.query.setSearch(searchString)
    }
  }, [debouncedSearchTerm, router, pathname, searchParams])

  return (
    <Search value={inputValue} onChange={(value) => setInputValue(value)} />
  )
}

export default SearchBar
