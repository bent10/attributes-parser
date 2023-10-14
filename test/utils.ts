export function match(str: string, regex: RegExp, prefix = '') {
  return (prefix + str).match(regex)?.toString()
}

export function matchNumber(str: string, regex: RegExp, prefix = '') {
  return Number((prefix + str).match(regex)?.[0])
}
