/**
 * return a function that will write the result of a query as a json response
 *
 */

export function ok(res) {
  return data => {
    res.json(data)
  }
}

/**
 * This function will return the appopriate error type
 * 404: not found
 * 401: unauthorized
 * 400: bad request (invalid or missing params)
 * 500: internal server error
 */

export function fail(res) {
  return error => {
    console.log(error)
    res.sendStatus(404).end()
  }
}
