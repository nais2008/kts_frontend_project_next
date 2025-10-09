"use client"

import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

export type ThemeValue = "light" | "dark" | "auto"
export const STORAGE_KEY: string = "app-theme"

interface ThemeContextType {
  theme: ThemeValue
  setTheme: (value: ThemeValue) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const getSystemTheme = (): "light" | "dark" => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark"
  }
  return "light"
}

const applyThemeClasses = (currentTheme: ThemeValue) => {
  if (typeof document === "undefined") return

  const html = document.documentElement
  html.classList.remove("light-theme", "dark-theme")

  const resolved = currentTheme === "auto" ? getSystemTheme() : currentTheme

  if (resolved === "dark") {
    html.classList.add("dark-theme")
  } else {
    html.classList.add("light-theme")
  }
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeValue>("auto")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage) {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as ThemeValue
      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "auto"
      ) {
        setThemeState(savedTheme)
      }
    }
  }, [])

  const setTheme = useCallback((newTheme: ThemeValue) => {
    setThemeState(newTheme)

    if (newTheme === "auto") {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, newTheme)
    }
  }, [])

  useEffect(() => {
    applyThemeClasses(theme)
    setResolvedTheme(theme === "auto" ? getSystemTheme() : theme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "auto") {
        applyThemeClasses("auto")
        setResolvedTheme(getSystemTheme())
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const contextValue = { theme, setTheme, resolvedTheme }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
