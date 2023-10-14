import jsonLoose from 'json-loose'

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
