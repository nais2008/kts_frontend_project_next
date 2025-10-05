export type TCollectionMoldel<K extends string | number, T> = {
  order: K[]
  entities: Record<K, T>
}

export const getInitialCollectionModel = <
  K extends string | number,
  T,
>(): TCollectionMoldel<K, T> => ({
  order: [],
  entities: {} as Record<K, T>,
})

export const normilizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K
): TCollectionMoldel<K, T> => {
  const colletction: TCollectionMoldel<K, T> = getInitialCollectionModel()

  elements.forEach((el) => {
    const id = getKeyForElement(el)
    colletction.order.push(id)
    colletction.entities[id] = el
  })

  return colletction
}

export const lineorizeCollection = <K extends string | number, T>(
  elements: TCollectionMoldel<K, T>
): T[] => elements.order.map((el) => elements.entities[el])
