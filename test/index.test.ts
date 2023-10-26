/// <reference types="vitest/globals" />

import parseAttrs from '../src/index.js'

it('should parse attributes into key-value pairs', () => {
  const input = `id="my-id" class="my-class" num=3.14 numNeg=-3.14 data-num="3.14" options='{"key":"value","array":[1,2,3]}' data-list='[1,2,3]' punc="a=b,c,d,e" checked=false data-checked="false" disabled="disabled"`
  const expectedResult = {
    id: 'my-id',
    class: 'my-class',
    num: 3.14, // number
    numNeg: -3.14, // negative number
    'data-num': '3.14', // preserve string
    options: { key: 'value', array: [1, 2, 3] },
    'data-list': [1, 2, 3],
    punc: 'a=b,c,d,e', // allowed, no ambiguous ampersand
    checked: false, // boolean
    'data-checked': 'false', // preserve string
    disabled: 'disabled' // shorthand
  }

  const result = parseAttrs(input)

  expect(result).toEqual(expectedResult)
  expect(result.toString()).toEqual(
    `id="my-id" class="my-class" num=3.14 numNeg=-3.14 data-num="3.14" options='{"key":"value","array":[1,2,3]}' data-list='[1,2,3]' punc="a=b,c,d,e" checked=false data-checked="false" disabled="disabled"`
  )
  expect(result.getTokens()).toMatchSnapshot()
})

it('should handle attribute shorthands', () => {
  const input = '#my-id#short-id.foo.bar class="baz"'

  const result = parseAttrs(input)
  expect(result).toEqual({ id: 'short-id', class: 'foo bar baz' })
})

it('should use the last duplicate key value but class', () => {
  const input =
    'id="my-id" #short-id .foo.bar data-value="123" data-value=1_000_000 class="baz"'

  const result = parseAttrs(input)
  expect(result).toEqual({
    id: 'short-id',
    'data-value': 1000000,
    class: 'foo bar baz'
  })
})

it('should handle number-like correctly', () => {
  const input = 'foo="42" bar="-42" baz="3.14" qux="0.5" mqux="-0.5" quux=".5"'
  const expectedResullt = {
    foo: '42',
    bar: '-42',
    baz: '3.14',
    qux: '0.5',
    mqux: '-0.5',
    quux: '.5'
  }

  const result = parseAttrs(input)
  expect(result).toEqual(expectedResullt)
})

it('should handle boolean-like values correctly', () => {
  const input = 'foo="true" bar="false"'
  const expectedResullt = { foo: 'true', bar: 'false' }

  const result = parseAttrs(input)
  expect(result).toEqual(expectedResullt)
})

it('should handle numeric values correctly', () => {
  const input = 'foo=42 bar=-42 baz=3.14 qux=0.5 mqux=-0.5 quux=.5'
  const expectedResullt = {
    foo: 42,
    bar: -42,
    baz: 3.14,
    qux: 0.5,
    mqux: -0.5,
    quux: 0.5
  }

  const result = parseAttrs(input)
  expect(result).toEqual(expectedResullt)
})

it('should handle boolean values correctly', () => {
  const input = 'foo=true bar=false'
  const expectedResullt = { foo: true, bar: false }

  const result = parseAttrs(input)
  expect(result).toEqual(expectedResullt)
})

it('throws single-quoted values with ambiguous ampersand', () => {
  const input = "foo='bar &amp; baz'"

  expect(() => parseAttrs(input)).toThrow("foo='bar &amp; baz'")
})

it('throws double-quoted values with ambiguous ampersand', () => {
  const input = 'foo="bar &amp; baz"'

  expect(() => parseAttrs(input)).toThrow('foo="bar &amp; baz"')
})

it('should not throws unquoted values with ambiguous ampersand', () => {
  const input = 'foo=bar&amp;baz'

  expect(() => parseAttrs(input)).not.toThrow()
})
