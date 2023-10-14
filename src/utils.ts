import jsonLoose from 'json-loose'

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
