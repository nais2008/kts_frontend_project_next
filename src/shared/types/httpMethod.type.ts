export const HTTPMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
}

export type HTTPMethod = (typeof HTTPMethod)[keyof typeof HTTPMethod]
