export const convertNullValuesToEmptyStrings = (object: object) => {
  Object.keys(object).forEach(key => {
    if (object[key] === null) object[key] = ''
  })

  return object
}

export const convertStringToNumber = (value: string) => {
  if (typeof value !== 'string') {
    return
  }

  const cleanedValue = value.replace('.', '').replace(',', '.')

  return parseFloat(cleanedValue)
}

export function cleanNumericString(input, keepDecimal = false, keepNegative = false) {
  if (typeof input !== 'string') {
    return
  }

  let regex
  if (keepDecimal && keepNegative) {
    regex = /[^\d.-]/g
  } else if (keepDecimal) {
    regex = /[^\d.]/g
  } else if (keepNegative) {
    regex = /[^\d-]/g
  } else {
    regex = /[^\d]/g
  }

  return input.replace(regex, '')
}
