import React from "react"

type UseStrictContextParams<T> = {
  context: React.Context<T | null>
  message?: string
}

export const useStrictContext = <T>({
  context,
  message = "useStrictContext missing provider",
}: UseStrictContextParams<T>): T => {
  const value = React.useContext(context)

  if (value === null) {
    throw new Error(message)
  }
  return value
}
