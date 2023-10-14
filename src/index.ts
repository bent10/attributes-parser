import moo from 'moo'
import {
  AttributeName,
  BooleanLiteral,
  DoubleQuotedLiteral,
  NumericLiteral,
  SingleQuotedLiteral,
  UnquotedLiteral,
  WhiteSpace
} from './constants.js'
import { formatString, serialize } from './utils.js'
import type { Attributes } from './types.js'

const lexer = moo.states({
  main: {
    WhiteSpace: { match: WhiteSpace, lineBreaks: true },
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
    },
    AttributeName,
    Separator: '='
  }
})

/**
 * Parse attributes string into an object.
 *
 * @param input - Attributes string.
 * @returns Parsed attributes as key-value pairs.
 */
export default function parseAttrs(input: string): Attributes {
  let currentKey = null

  const tokens = lexer.reset(input)
  const attrs = {} as Attributes

  Object.defineProperties(attrs, {
    toString: {
      writable: false,
      enumerable: false,
      configurable: false,
      value: () => serialize(attrs)
    },
    getTokens: {
      writable: false,
      enumerable: false,
      configurable: false,
      value: () => Array.from(lexer.reset(input))
    }
  })

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

export type { Attributes, Token, TokenType } from './types.js'
