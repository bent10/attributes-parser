import moo from 'moo'
import {
  UnquotedLiteral,
  AttributeName,
  BooleanLiteral,
  DoubleQuotedLiteral,
  NumericLiteral,
  SingleQuotedLiteral,
  WhiteSpace
} from './constants.js'
import { formatString } from './utils.js'
import type { Attributes, Token, TokenType } from './types.js'

const lexer = moo.states({
  main: {
    WhiteSpace: { match: WhiteSpace, lineBreaks: true },
    AttributeName,
    Separator: '=',
    BooleanLiteral: {
      match: BooleanLiteral,
      value(x) {
        return (x === 'true' ? true : false) as unknown as string
      }
    },
    NumericLiteral: {
      match: NumericLiteral,
      value(x) {
        const n = Number(x)

        return (Number.isNaN(n)
          ? Number(x.replace(/_|n$/g, ''))
          : Number(x)) as unknown as string
      }
    },
    SingleQuotedValue: {
      match: SingleQuotedLiteral,
      value: formatString,
      type: () => 'StringLiteral'
    },
    DoubleQuotedLiteral: {
      match: DoubleQuotedLiteral,
      value: formatString,
      type: () => 'StringLiteral'
    },
    UnquotedLiteral: {
      match: UnquotedLiteral,
      value: formatString,
      type: () => 'StringLiteral'
    }
  }
})

/**
 * Tokenize the attributes string.
 *
 * @param str - Attributes string.
 * @returns Array of tokens.
 */
export function tokenizeAttrs(str: string) {
  return lexer.reset(str)
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

  for (const { type, value } of tokens) {
    switch (type) {
      case 'AttributeName':
        currentKey = value
        // Initialize with true value
        attrs[currentKey] = currentKey
        break

      case 'BooleanLiteral':
      case 'NumericLiteral':
      case 'StringLiteral':
        if (currentKey) {
          attrs[currentKey] = value
          currentKey = null
        }
        break
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
    'WhiteSpace',
    'Separator',
    'BooleanLiteral',
    'NumericLiteral',
    'StringLiteral',
    'AttributeName'
  ]

  return tokens
    .map(({ type, value, text }) => ({ type, value, text }))
    .reduce((acc, cur) => {
      if (type.indexOf(cur.type) === -1) return acc

      return acc + cur.text
    }, '')
}

export type { Attributes, Token, TokenType }
