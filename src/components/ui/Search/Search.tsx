import React from "react"

import { Search as IconSearch } from "lucide-react"

import DropDown from "@/components/ui/DropDown"
import Input from "@/components/ui/Input"

import styles from "./Search.module.scss"

interface SearchProps {
  value: string
  placeholder: string
  onChange: (value: string) => void
  repoType: string
  onTypeChange: (value: string) => void
}

const REPO_TYPE_OPTIONS = [
  { value: "all", label: "Все" },
  { value: "public", label: "Публичные" },
  { value: "private", label: "Приватные" },
  { value: "forks", label: "Форки" },
  { value: "sources", label: "Исходные" },
]

const Search: React.FC<SearchProps> = ({
  value,
  placeholder,
  onChange,
  repoType,
  onTypeChange,
}) => {
  return (
    <div className={styles.search_contant}>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        afterSlot={<IconSearch size={16} />}
      />

      <DropDown
        options={REPO_TYPE_OPTIONS}
        value={repoType}
        onChange={onTypeChange}
      />
    </div>
  )
}

export default React.memo(Search)
