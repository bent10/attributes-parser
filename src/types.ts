/**
 * Attributes represent a collection of key-value pairs where the keys are
 * strings and the values can be null, string, boolean, number, an array, or an
 * object with keys of type string and values.
 */
export type Attributes = {
  [key: string]:
    | null
    | string
    | boolean
    | number
    | unknown[]
    | { [key: string]: unknown }
}

/**
 * Token represents a lexer token with various properties.
 */
export interface Token {
  /**
   * Returns value of the token, or its type if value isn't available.
   */
  toString(): string

  /**
   * The name of the group, as passed to compile.
   */
  type: TokenType

  /**
   * The match contents.
   */
  value: string

  /**
   * The number of bytes from the start of the buffer where the match starts.
   */
  offset: number

  /**
   * The complete match.
   */
  text: string

  /**
   * The number of line breaks found in the match. Always zero if this rule has
   * `lineBreaks: false`.
   */
  lineBreaks: number

  /**
   * The line number of the beginning of the match, starting from 1.
   */
  line: number

  /**
   * The column where the match begins, starting from 1.
   */
  col: number
}

/**
 * TokenType represents the type of a lexer token, which can be one of the
 * following:
 *
 * - 'WhiteSpace'
 * - 'Separator'
 * - 'BooleanLiteral'
 * - 'NumericLiteral'
 * - 'StringLiteral'
 * - 'AttributeName'
 */
export type TokenType =
  | 'WhiteSpace'
  | 'Separator'
  | 'BooleanLiteral'
  | 'NumericLiteral'
  | 'StringLiteral'
  | 'AttributeName'
