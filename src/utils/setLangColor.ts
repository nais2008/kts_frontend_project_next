import rawColors from "@/data/languageColor.json"
import type { LanguageColor } from "@/shared/interfaces/languageColor.interface"

export type ColorsMap = Record<string, LanguageColor>

const colors = rawColors as ColorsMap

export const getLangColor = (lang: string) => colors[lang]?.color ?? "#ccc"
