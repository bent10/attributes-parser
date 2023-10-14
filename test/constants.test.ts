/// <reference types="vitest/globals" />

import {
  AttributeName,
  BooleanLiteral,
  DoubleQuotedLiteral,
  NumericLiteral,
  SingleQuotedLiteral,
  WhiteSpace
} from '../src/constants'

it('should match various white space characters', () => {
  expect(match(' \t\v\f\uFEFF', WhiteSpace)).toBe(' \t\v\f\uFEFF')
  expect(match('abc123', WhiteSpace)).toBeUndefined()
})

it('should match attribute names', () => {
  const regex = new RegExp(`^${AttributeName.source}$`)

  // Valid attribute names
  expect(regex.test('validname')).toBe(true)
  expect(regex.test('validName')).toBe(true)
  expect(regex.test('valid_name')).toBe(true)
  expect(regex.test('valid-name')).toBe(true)
  expect(regex.test('valid42')).toBe(true)
  expect(regex.test('valid-42')).toBe(true)
  expect(regex.test('-valid')).toBe(true)
  expect(regex.test('_valid')).toBe(true)
  expect(regex.test('$valid')).toBe(true)
  expect(regex.test('@valid')).toBe(true)
  expect(regex.test('valid@name')).toBe(true)
  expect(regex.test(':valid')).toBe(true)
  expect(regex.test('valid:name')).toBe(true)

  // Invalid attribute names
  expect(regex.test('\x07Fvalid')).toBe(false)
  expect(regex.test('invalid name')).toBe(false)
  expect(regex.test('"invalidName"')).toBe(false)
  expect(regex.test('name>')).toBe(false)
  expect(regex.test('name=')).toBe(false)
  expect(regex.test('name\x00')).toBe(false)
  expect(regex.test('name\n')).toBe(false)
})

it('should match boolean literals with optional quotes', () => {
  expect(match('true', BooleanLiteral, '=')).toBe('true')
  expect(match('false', BooleanLiteral, '=')).toBe('false')
  expect(match('true', BooleanLiteral)).toBeUndefined()
  expect(match('false', BooleanLiteral)).toBeUndefined()
})

it('should match various forms of numeric literals', () => {
  const hexLiteral = '0x1A3'
  const octalLiteral = '0o755'
  const binaryLiteral = '0b1101'
  const decimalLiteral = '123.456'
  const scientificLiteral = '1.23e-45'
  const zeroLiteral = '0'
  const underscoredLiteral = '1_000_000'
  const integerLiteral = '42'
  const integerNegLiteral = '-42'
  const scientificNoFraction = '1e3'
  const scientificNoExponent = '12.34e'

  expect(matchNumber(hexLiteral, NumericLiteral, '=')).toBe(419)
  expect(matchNumber(octalLiteral, NumericLiteral, '=')).toBe(493)
  expect(matchNumber(binaryLiteral, NumericLiteral, '=')).toBe(13)
  expect(matchNumber(decimalLiteral, NumericLiteral, '=')).toBe(123.456)
  expect(matchNumber(scientificLiteral, NumericLiteral, '=')).toBe(1.23e-45)
  expect(matchNumber(zeroLiteral, NumericLiteral, '=')).toBe(0)
  expect(matchNumber(underscoredLiteral, NumericLiteral, '=')).toBe(NaN) // => 1000000
  expect(matchNumber(integerLiteral, NumericLiteral, '=')).toBe(42)
  expect(matchNumber(integerNegLiteral, NumericLiteral, '=')).toBe(-42)
  expect(matchNumber(scientificNoFraction, NumericLiteral, '=')).toBe(1000)
  expect(matchNumber(scientificNoExponent, NumericLiteral, '=')).toBe(12.34)

  expect(matchNumber(hexLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(octalLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(binaryLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(decimalLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(scientificLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(zeroLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(underscoredLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(integerLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(integerNegLiteral, NumericLiteral)).toBe(NaN)
  expect(matchNumber(scientificNoFraction, NumericLiteral)).toBe(NaN)
  expect(matchNumber(scientificNoExponent, NumericLiteral)).toBe(NaN)
})

it('should match single-quoted attribute values with ampersand restrictions', () => {
  // Valid single-quoted attribute values
  expect(SingleQuotedLiteral.test("='valid value'")).toBe(true)
  expect(SingleQuotedLiteral.test("='valid@value'")).toBe(true)
  expect(SingleQuotedLiteral.test("='valid & value'")).toBe(true)
  expect(SingleQuotedLiteral.test("='valid &; value'")).toBe(true)
  expect(SingleQuotedLiteral.test("='42'")).toBe(true)
  expect(SingleQuotedLiteral.test("='-42'")).toBe(true)
  expect(SingleQuotedLiteral.test("='3.14'")).toBe(true)
  expect(SingleQuotedLiteral.test("='0.5'")).toBe(true)
  expect(SingleQuotedLiteral.test("='-0.5'")).toBe(true)
  expect(SingleQuotedLiteral.test("='.5'")).toBe(true)
  expect(SingleQuotedLiteral.test("='escaped single quote: \\''")).toBe(true)
  expect(SingleQuotedLiteral.test("='newline: \n'")).toBe(true)
  expect(SingleQuotedLiteral.test("='escaped newline: \\n'")).toBe(true)
  expect(SingleQuotedLiteral.test("='[1, 2, 3]'")).toBe(true)
  expect(SingleQuotedLiteral.test('=\'{foo: "bar"}\'')).toBe(true)

  // Invalid single-quoted attribute values
  expect(SingleQuotedLiteral.test('=\'invalid value"')).toBe(false)
  expect(SingleQuotedLiteral.test("='invalid value\\'")).toBe(false)
  expect(SingleQuotedLiteral.test("='invalid &value;'")).toBe(false) // ambiguous ampersand
})

it('should match double-quoted attribute values with ampersand restrictions', () => {
  // Valid double-quoted attribute values
  expect(DoubleQuotedLiteral.test('="valid value"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="valid@value"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="valid & value"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="valid &; value"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="42"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="-42"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="3.14"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="0.5"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="-0.5"')).toBe(true)
  expect(DoubleQuotedLiteral.test('=".5"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="escaped double quote: \\""')).toBe(true)
  expect(DoubleQuotedLiteral.test('="newline: \n"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="escaped newline: \\n"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="[1, 2, 3]"')).toBe(true)
  expect(DoubleQuotedLiteral.test('="{foo: \'bar\'}"')).toBe(true)

  // Invalid double-quoted attribute values
  expect(DoubleQuotedLiteral.test('="invalid value\'')).toBe(false)
  expect(DoubleQuotedLiteral.test('="invalid value\\"')).toBe(false)
  expect(DoubleQuotedLiteral.test('="invalid &value;')).toBe(false) // ambiguous ampersand
})

function match(str: string, regex: RegExp, prefix = '') {
  return (prefix + str).match(regex)?.toString()
}

function matchNumber(str: string, regex: RegExp, prefix = '') {
  return Number((prefix + str).match(regex)?.[0])
}
