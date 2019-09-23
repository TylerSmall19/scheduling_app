export const successResponse = (body) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ response: body })
  }
}

export const internalError = (err = 'An error occurred') => {
  return {
    statusCode: 500,
    body: JSON.stringify({ error: err })
  }
}