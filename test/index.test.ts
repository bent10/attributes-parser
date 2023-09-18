/// <reference types="vitest/globals" />

import {
  tokenizeAttrs,
  parseAttrs,
  serializeTokens,
  type Token
} from '../src/index.js'

describe('tokenizeAttrs', () => {
  it('should tokenize a string of attributes', () => {
    const input = `id="foo" class=\'bar\' num="3.14" data-value=baz name="@myName" data-value="[1, 2, 3]" fooBar="{foo: 'bar'}" checked=false disabled`

    const result = tokenizeAttrs(input)
    expect(result).toMatchSnapshot()
  })
})

describe('parseAttrs', () => {
  it('should parse attributes into key-value pairs', () => {
    const input = `id="foo" class=\'bar\' num="-3.14" data-value=baz name="@myName" data-value="[1, 2, 3]" fooBar="{foo: 'bar'}" checked=false disabled`
    const expectedParsedAttrs = {
      id: 'foo',
      class: 'bar',
      num: -3.14,
      'data-value': [1, 2, 3],
      name: '@myName',
      fooBar: { foo: 'bar' },
      checked: false,
      disabled: true
    }

    const result = parseAttrs(input)
    expect(result).toEqual(expectedParsedAttrs)
  })

  it('should use the last duplicate key value', () => {
    const input = 'foo="foo" foo="bar"'

    const result = parseAttrs(input)
    expect(result).toEqual({ foo: 'bar' })
  })

  it('should handle number-like correctly', () => {
    const input = 'foo="42" bar="-42" baz="3.14" qux="0.5" quux="-0.5" nan=".5"'
    const expectedParsedAttrs = {
      foo: 42,
      bar: -42,
      baz: 3.14,
      qux: 0.5,
      quux: -0.5,
      nan: '.5'
    }

    const result = parseAttrs(input)
    expect(result).toEqual(expectedParsedAttrs)
  })

  it('should handle double-quoted values with special characters', () => {
    const input =
      'name="@myName" data-value="[1, 2, 3]" foo="{bar: \'bar\'}" checked=false'
    const expectedParsedAttrs = {
      name: '@myName',
      'data-value': [1, 2, 3],
      foo: { bar: 'bar' },
      checked: false
    }

    const result = parseAttrs(input)
    expect(result).toEqual(expectedParsedAttrs)
  })

  it('should handle unquoted values with special characters', () => {
    const input = 'name=myName data-value=[1,2,3] disabled={value:true}'
    const expectedParsedAttrs = {
      name: 'myName',
      'data-value': [1, 2, 3],
      disabled: { value: true }
    }

    const result = parseAttrs(input)
    expect(result).toEqual(expectedParsedAttrs)
  })
})

describe('serializeTokens', () => {
  it('should serialize an array of tokens into a string', () => {
    const tokens = [
      { type: 'name', value: 'id', text: 'id' },
      { type: 'separator', value: '=', text: '=' },
      { type: 'doubleQuotedvalue', value: 'foo', text: '"foo"' }
    ] as Token[]
    const expectedSerializedString = 'id="foo"'

    const result = serializeTokens(tokens)
    expect(result).toEqual(expectedSerializedString)
  })

  it('should handle tokens with different types', () => {
    const tokens = [
      { type: 'name', value: 'id', text: 'id' },
      { type: 'separator', value: '=', text: '=' },
      { type: 'doubleQuotedvalue', value: 'foo', text: '"foo"' },
      { type: 'invalidType', value: 'ignored', text: 'ignored' }, // ignored silently
      { type: 'whitespace', value: ' ', text: ' ' },
      { type: 'name', value: 'class', text: 'class' },
      { type: 'separator', value: '=', text: '=' },
      {
        type: 'singleQuotedvalue',
        value: { bar: 'bar' },
        text: `'{bar: "bar"}'`
      }
    ] as Token[]
    const expectedSerializedString = `id="foo" class='{bar: "bar"}'`

    const result = serializeTokens(tokens)
    expect(result).toEqual(expectedSerializedString)
  })
})

it('test', () => {
  const attrs = `id="foo" class=\'bar\' num="123" data-value=baz name="@myName" data-value="[1, 2, 3]" fooBar="{foo: 'bar'}" checked=false disabled`
  const parsedAttrs = parseAttrs(attrs)

  console.log(parsedAttrs)
})
