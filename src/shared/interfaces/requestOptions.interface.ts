import { HTTPMethod } from "../types/httpMethod.type"

export interface IRequestOptions<ReqT = unknown> {
  method: HTTPMethod
  endpoint: string
  data?: ReqT
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
  headers?: Record<string, string>
}
