import { useEffect, useState } from "react"

const DEBOUNCE_TIME = 300

export const useDebounce = (value: string, delay: number = DEBOUNCE_TIME) => {
  const [debouncedValude, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValude
}
