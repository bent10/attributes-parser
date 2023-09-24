import * as moo from 'moo'
import {
  ATTR_DOUBLE_QUOTED_VALUE_RULE,
  ATTR_NAME_RULE,
  ATTR_SINGLE_QUOTED_VALUE_RULE,
  ATTR_UNQUOTED_VALUE_RULE
} from './constants.js'
import type { Attributes, Token, TokenType } from './types.js'

/**
 * Lexer states and rules for tokenizing HTML attributes.
 */
const lexer = moo.states({
  main: {
    whitespace: /[ \t]+/,
    name: ATTR_NAME_RULE,
    separator: {
      match: '=',
      push: 'insideValue'
    }
  },
  insideValue: {
    whitespace: /[ \t]+/,
    singleQuotedvalue: {
      match: ATTR_SINGLE_QUOTED_VALUE_RULE,
      value,
      push: 'main'
    },
    doubleQuotedvalue: {
      match: ATTR_DOUBLE_QUOTED_VALUE_RULE,
      value,
      push: 'main'
    },
    unquotedvalue: {
      match: ATTR_UNQUOTED_VALUE_RULE,
      value,
      push: 'main'
    }
  }
})

/**
 * Transform function values.
 */
function value(text: string) {
  let value = text
  if (typeof text === 'string' && /^(['"]).*?\1$/.test(text)) {
    value = text.slice(1, -1)
  }

  // number like matches (e.g. 42, -42, 3.14, 0.5, -0.5)
  if (/^-?0*(\d+(?:\.\d+)?)$/.test(value)) {
    return Number(value)
  }

  return (value.startsWith('[') && value.endsWith(']')) ||
    (value.startsWith('{') && value.endsWith('}')) ||
    value === 'true' ||
    value === 'false'
    ? Function(`return ${value}`)()
    : value
}

/**
 * Tokenize the attributes string.
 *
 * @param str - Attributes string.
 * @returns Array of tokens.
 */
export function tokenizeAttrs(str: string) {
  lexer.reset(str)
  const tokens = []
  let token
  while ((token = lexer.next())) {
    tokens.push(token)
  }
  return tokens as Token[]
}

/**
 * Parse attributes string into an object.
 *
 * @param str - Attributes string.
 * @returns Parsed attributes as key-value pairs.
 */
export function parseAttrs(str: string) {
  const tokens = tokenizeAttrs(str)
  const attrs: Attributes = {}
  let currentKey = null

  for (const token of tokens) {
    if (token.type === 'name') {
      currentKey = token.value

      // Initialize with true value
      attrs[currentKey] = true
    } else if (
      (token.type === 'unquotedvalue' ||
        token.type === 'singleQuotedvalue' ||
        token.type === 'doubleQuotedvalue') &&
      currentKey
    ) {
      attrs[currentKey] = token.value
      currentKey = null
    }
  }

  return attrs
}

/**
 * Serialize an array of tokens into a string.
 *
 * @param tokens - Array of tokens to serialize.
 * @returns Serialized string.
 */
export function serializeTokens(tokens: Token[]) {
  const type: TokenType[] = [
    'whitespace',
    'name',
    'separator',
    'singleQuotedvalue',
    'doubleQuotedvalue',
    'unquotedvalue'
  ]

  return tokens
    .map(({ type, value, text }) => ({ type, value, text }))
    .reduce((acc, cur) => {
      if (type.indexOf(cur.type) === -1) return acc

      return acc + cur.text
    }, '')
}

export type { Attributes, Token, TokenType }
