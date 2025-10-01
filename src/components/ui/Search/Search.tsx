import React from "react"

import { Search as IconSearch } from "lucide-react"

import Input from "@/components/ui/Input"

import styles from "./Search.module.scss"

interface SearchProps {
  value: string
  onChange: (value: string) => void
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className={styles.search_contant}>
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        afterSlot={<IconSearch size={16} />}
      />
    </div>
  )
}

export default React.memo(Search)
