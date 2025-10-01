export const HTTPStatus = {
  OK: 200,
  CREATED: 201,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  UNEXPECTED_ERROR: 520,
}

export type HTTPStatus = (typeof HTTPStatus)[keyof typeof HTTPStatus]
