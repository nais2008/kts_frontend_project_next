export const MetaValues = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const

export type MetaValues = (typeof MetaValues)[keyof typeof MetaValues]
