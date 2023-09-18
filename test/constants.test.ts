/// <reference types="vitest/globals" />

import {
  ATTR_NAME_RULE,
  ATTR_SINGLE_QUOTED_VALUE_RULE,
  ATTR_DOUBLE_QUOTED_VALUE_RULE,
  ATTR_UNQUOTED_VALUE_RULE
} from '../src/constants.js'

test('ATTR_NAME_RULE: Attribute names validation', () => {
  const regex = new RegExp(`^${ATTR_NAME_RULE.source}$`)

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

test('ATTR_SINGLE_QUOTED_VALUE_RULE: Single-quoted attribute values validation', () => {
  const regex = new RegExp(`^${ATTR_SINGLE_QUOTED_VALUE_RULE.source}$`)

  // Valid single-quoted attribute values
  expect(regex.test("'valid value'")).toBe(true)
  expect(regex.test("'valid@value'")).toBe(true)
  expect(regex.test("'valid & value'")).toBe(true)
  expect(regex.test("'valid &; value'")).toBe(true)
  expect(regex.test("'42'")).toBe(true)
  expect(regex.test("'-42'")).toBe(true)
  expect(regex.test("'3.14'")).toBe(true)
  expect(regex.test("'0.5'")).toBe(true)
  expect(regex.test("'-0.5'")).toBe(true)
  expect(regex.test("'.5'")).toBe(true)
  expect(regex.test("'escaped single quote: \\''")).toBe(true)
  expect(regex.test("'newline: \n'")).toBe(true)
  expect(regex.test("'escaped newline: \\n'")).toBe(true)
  expect(regex.test("'[1, 2, 3]'")).toBe(true)
  expect(regex.test('\'{foo: "bar"}\'')).toBe(true)

  // Invalid single-quoted attribute values
  expect(regex.test('\'invalid value"')).toBe(false)
  expect(regex.test("'invalid value''")).toBe(false)
  expect(regex.test("'invalid &value;'")).toBe(false) // ambiguous ampersand
})

test('ATTR_DOUBLE_QUOTED_VALUE_RULE: Double-quoted attribute values validation', () => {
  const regex = new RegExp(`^${ATTR_DOUBLE_QUOTED_VALUE_RULE.source}$`)

  // Valid double-quoted attribute values
  expect(regex.test('"valid value"')).toBe(true)
  expect(regex.test('"valid@value"')).toBe(true)
  expect(regex.test('"valid & value"')).toBe(true)
  expect(regex.test('"valid &; value"')).toBe(true)
  expect(regex.test('"42"')).toBe(true)
  expect(regex.test('"-42"')).toBe(true)
  expect(regex.test('"3.14"')).toBe(true)
  expect(regex.test('"0.5"')).toBe(true)
  expect(regex.test('"-0.5"')).toBe(true)
  expect(regex.test('".5"')).toBe(true)
  expect(regex.test('"escaped double quote: \\""')).toBe(true)
  expect(regex.test('"newline: \n"')).toBe(true)
  expect(regex.test('"escaped newline: \\n"')).toBe(true)
  expect(regex.test('"[1, 2, 3]"')).toBe(true)
  expect(regex.test('"{foo: \'bar\'}"')).toBe(true)

  // Invalid double-quoted attribute values
  expect(regex.test('"invalid value\'')).toBe(false)
  expect(regex.test('"invalid value""')).toBe(false)
  expect(regex.test('"invalid &value;')).toBe(false) // ambiguous ampersand
})

test('ATTR_UNQUOTED_VALUE_RULE: Unquoted attribute values validation', () => {
  const regex = new RegExp(`^${ATTR_UNQUOTED_VALUE_RULE.source}$`)

  // Valid unquoted attribute values
  expect(regex.test('validValue')).toBe(true)
  expect(regex.test('anotherValue')).toBe(true)
  expect(regex.test('another@value')).toBe(true)
  expect(regex.test('42')).toBe(true)
  expect(regex.test('-42')).toBe(true)
  expect(regex.test('3.14')).toBe(true)
  expect(regex.test('0.5')).toBe(true)
  expect(regex.test('-0.5')).toBe(true)
  expect(regex.test('.5')).toBe(true)
  expect(regex.test('false')).toBe(true)
  expect(regex.test('true')).toBe(true)
  expect(regex.test('false')).toBe(true)

  // Invalid unquoted attribute values
  expect(regex.test('invalid value')).toBe(false)
  expect(regex.test('value"')).toBe(false)
  expect(regex.test("value'")).toBe(false)
  expect(regex.test('value`')).toBe(false)
  expect(regex.test('=value')).toBe(false)
  expect(regex.test('value>')).toBe(false)
  expect(regex.test('value<')).toBe(false)
  expect(regex.test('value\x00')).toBe(false)
  expect(regex.test('value\n')).toBe(false)
})
