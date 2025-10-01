/**
 * Форматирует дату в строку вида "DD Mon".
 *
 * @param date - Объект Date.
 * @returns Строка с днём и сокращённым месяцем или пустая строка, если дата некорректна.
 */
export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return ""

  const day = date.getDate()
  const month = date.toLocaleString("en-US", { month: "short" })

  return `${day} ${month}`
}
