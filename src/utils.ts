import jsonLoose from 'json-loose'
import type { Attributes } from './types.js'

/**
 * Formats a string value. If the input text is enclosed in single or double quotes,
 * it omits the quotes. If the value resembles an object (starts with `[`
 * or `{` and ends with `]` or `}`), it is parsed as JSON using the
 * `jsonLoose`.
 */
export function formatString(text: string) {
  const value =
    typeof text === 'string' && /^(['"]).*?\1$/.test(text)
      ? // omit quotes
        text.slice(1, -1)
      : text

  // object-like values
  if (
    (value.startsWith('[') && value.endsWith(']')) ||
    (value.startsWith('{') && value.endsWith('}'))
  ) {
    return JSON.parse(jsonLoose(value))
  }

  return value
}

/**
 * Serializes an object of attributes into an attribute string.
 */
export function serialize(attrs: Attributes) {
  let acc = ''
  for (const key in attrs) {
    const value = attrs[key]

    switch (typeof value) {
      case 'object':
        acc += ` ${key}='${JSON.stringify(value)}'`
        break
      case 'string':
        acc += ` ${key}="${value}"`
        break
      case 'number':
      case 'boolean':
        acc += ` ${key}=${value}`
        break
    }
  }

  return acc.slice(1)
}
