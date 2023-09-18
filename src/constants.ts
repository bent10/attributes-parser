/**
 * Regular expression for matching attribute names.
 *
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
export const ATTR_NAME_RULE =
  /(?![\s\x00\x22\x27\x3E\x2F\x3D\x00-\x1F\x7F-\x9F])[^\s\x00-\x1F\x7F-\x9F\x22\x27\x3E\x2F\x3D]+/

/**
 * Regular expression for matching single-quoted attribute values.
 *
 * Matches a single-quoted attribute value enclosed in single quotes. Allows
 * for escaped single quotes (`\'`) and escaped newlines (`\\n`), with the
 * additional restriction that the value cannot contain an ambiguous
 * ampersand.
 *
 * @see [HTML syntax attributes](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes)
 * @see [Ambiguous ampersand](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-ambiguous-ampersand).
 */
export const ATTR_SINGLE_QUOTED_VALUE_RULE =
  /'(?!.*&[0-9a-zA-Z]+;)[^'\\]*(?:\\.|\\n[^"\\]*|&[^0-9a-zA-Z;]*)*'/

/**
 * Regular expression for matching double-quoted attribute values.
 *
 * Matches a double-quoted attribute value enclosed in double quotes. Allows
 * for escaped double quotes (`\"`) and escaped newlines (`\\n`), with the
 * additional restriction that the value cannot contain an ambiguous
 * ampersand.
 *
 * @see [HTML syntax attributes](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes)
 * @see [Ambiguous ampersand](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-ambiguous-ampersand)
 */
export const ATTR_DOUBLE_QUOTED_VALUE_RULE =
  /"(?!.*&[0-9a-zA-Z]+;)[^"\\]*(?:\\.|\\n[^"\\]*|&[^0-9a-zA-Z;]*)*"/

/**
 * Regular expression for matching unquoted attribute values.
 *
 * Matches a sequence of characters that must not contain any of the
 * characters U+0022 ("), U+0027 ('), U+0060 (`), U+003D (=), U+003C (<),
 * U+003E (>), or whitespace (space or tab).
 *
 * @see [HTML syntax attributes](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes)
 */
export const ATTR_UNQUOTED_VALUE_RULE = /[^"\s'`=<>\x00]+/
