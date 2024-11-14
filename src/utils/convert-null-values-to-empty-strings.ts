export const convertNullValuesToEmptyStrings = (object: object) => {
  Object.keys(object).forEach(key => {
    if (object[key] === null) object[key] = ''
  })

  return object
}
