import moo from 'moo'
import {
  AttributeName,
  AttributeShorthand,
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
    WhiteSpace,
    AttributeShorthand,
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

  const classes: string[] = []

  // we want to handle duplicate keys by taking the last value, but 'class'
  for (const { type, value } of tokens) {
    switch (type) {
      case 'AttributeName':
        currentKey = value
        // Initialize with true value
        attrs[currentKey] = currentKey
        break
      case 'AttributeShorthand':
        const selector = value[0]

        if (selector === '.') classes.push(value.slice(1))
        else if (selector === '#') attrs.id = value.slice(1)
        break
      case 'BooleanLiteral':
      case 'NumericLiteral':
      case 'StringLiteral':
        if (currentKey) {
          if (currentKey === 'class') classes.push(value)

          attrs[currentKey] = value
          currentKey = null
        }
        break
    }
  }

  if (classes.length) {
    attrs.class = classes.join(' ')
  }

  return attrs
}

export type { Attributes, Token, TokenType } from './types.js'
