"use client"

import React, { FC } from "react"

import { ThemeValue, useTheme } from "@/providers/ThemeProvider"

import DropDown from "../DropDown"

const themeOptions = [
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Темная" },
  { value: "auto", label: "Авто" },
]

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as ThemeValue)
  }

  return (
    <DropDown
      options={themeOptions}
      value={theme}
      onChange={handleThemeChange}
    />
  )
}

export default ThemeSwitcher
