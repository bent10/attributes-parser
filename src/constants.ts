/**
 * Matches various white space characters, including tab, vertical tab, form
 * feed, and zero-width non-breaking space.
 *
 * Unicode space separators are not included!
 */
export const WhiteSpace = /[ \t\v\f\ufeff]+/

/**
 * Ensure that the string doesn't start with any of the prohibited characters,
 * including space characters, U+0000 NULL, U+0022 QUOTATION MARK
 * (""), U+0027 APOSTROPHE ("'"), U+003E GREATER-THAN SIGN (>),
 * U+002F SOLIDUS (/), U+003D EQUALS SIGN (=), control characters
 * (U+0000 to U+001F, U+007F to U+009F), and characters that are not
 * defined by Unicode. Following by one or more characters that are not in
 * the prohibited set of characters.
 *
 * @see [HTML syntax attributes](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes)
 */
export const AttributeName =
  // eslint-disable-next-line no-control-regex
  /(?:(?![\s\x00\x22\x27\x3E\x2F\x3D\x00-\x1F\x7F-\x9F])[^\s\x00-\x1F\x7F-\x9F\x22\x27\x3E\x2F\x3D])+/

export const AttributeShorthand =
  /[.#](?:(?!-?\d)(?:[a-zA-Z0-9\xA0-\uFFFF_-])+)/

/**
 * Matches boolean literals, allowing for optional single or double quotes.
 */
export const BooleanLiteral = /(?<==)(?:true|false)/

/**
 * Matches various forms of numeric literals, including hexadecimal, octal,
 * binary, decimal, and scientific notation.
 */
export const NumericLiteral =
  /(?<==)-?(?:(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|-?0n|-?[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|-?0[0-7]+)/

/**
 * Matches a single-quoted attribute value enclosed in single quotes. Allows
 * for escaped single quotes (`\'`) and escaped newlines (`\\n`), with the
 * additional restriction that the value cannot contain an ambiguous
 * ampersand.
 *
 * @see [HTML syntax attributes](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes)
 * @see [Ambiguous ampersand](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-ambiguous-ampersand).
 */
export const SingleQuotedLiteral =
  /(?<==)'(?!.*&[0-9a-zA-Z]+;)[^'\\]*(?:\\.|\\n[^"\\]*|&[^0-9a-zA-Z;]*)*'/

/**
 * Matches a double-quoted attribute value enclosed in double quotes. Allows
 * for escaped double quotes (`\"`) and escaped newlines (`\\n`), with the
 * additional restriction that the value cannot contain an ambiguous
 * ampersand.
 *
 * @see [HTML syntax attributes](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes)
 * @see [Ambiguous ampersand](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-ambiguous-ampersand)
 */
export const DoubleQuotedLiteral =
  /(?<==)"(?!.*&[0-9a-zA-Z]+;)[^"\\]*(?:\\.|\\n[^"\\]*|&[^0-9a-zA-Z;]*)*"/

/**
 * Matches a sequence of characters that must not contain any of the
 * characters U+0022 ("), U+0027 ('), U+0060 (`), U+003D (=), U+003C (<),
 * U+003E (>), or whitespace (space or tab).
 *
 * @see [HTML syntax attributes](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes)
 */
// eslint-disable-next-line no-control-regex
export const UnquotedLiteral = /(?<==)[^"\s'`=<>\x00]+/
