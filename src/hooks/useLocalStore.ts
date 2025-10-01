import React from "react"

import type { ILocalStore } from "@/shared/interfaces/localStore.interface"

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const container = React.useRef<null | T>(null)

  if (container.current === null) {
    container.current = creator()
  }

  React.useEffect(() => {
    return () => container.current?.destroy()
  }, [])

  return container.current
}
