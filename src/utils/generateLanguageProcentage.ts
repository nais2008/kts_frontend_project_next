/**
 * Вычисляет процентное соотношение использования языка
 * в репозитории на основе количества байт кода.
 *
 * @param lang - количество байт конкретного языка
 * @param languages - объект со всеми языками и количеством байт по каждому
 * @returns процент использования языка (с точностью до 0.1), в виде строки
 *
 * @example
 * const languages = { TypeScript: 5000, JavaScript: 2000 }
 * generateLanguagegenerateLanguageProcentage(languages.TypeScript, languages)
 * // "71.4"
 */
export const generateLanguageProcentage = (
  lang: number,
  languages: Record<string, number>
): string => {
  const totalBytes = Object.values(languages).reduce(
    (sum, bytes) => sum + bytes,
    0
  )

  return ((lang / totalBytes) * 100).toFixed(1)
}
