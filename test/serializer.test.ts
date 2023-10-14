/// <reference types="vitest/globals" />

import { serializeTokens, type Token } from '../src/index.js'

it('should serialize an array of tokens into a string', () => {
  const tokens = [
    { type: 'AttributeName', value: 'id', text: 'id' },
    { type: 'Separator', value: '=', text: '=' },
    { type: 'StringLiteral', value: 'foo', text: '"foo"' }
  ] as Token[]
  const expectedSerializedString = 'id="foo"'

  const result = serializeTokens(tokens)
  expect(result).toEqual(expectedSerializedString)
})

it('should handle tokens with different types', () => {
  const tokens = [
    { type: 'AttributeName', value: 'class', text: 'class' },
    { type: 'Separator', value: '=', text: '=' },
    { type: 'StringLiteral', value: 'foo', text: '"foo"' },
    { type: 'InvalidType', value: 'ignored', text: 'ignored' },
    { type: 'WhiteSpace', value: ' ', text: ' ' },
    { type: 'AttributeName', value: 'data-attr', text: 'data-attr' },
    { type: 'Separator', value: '=', text: '=' },
    {
      type: 'StringLiteral',
      value: { bar: 'bar' },
      text: `'{bar: "bar"}'`
    }
  ] as Token[]
  const expectedSerializedString = `class="foo" data-attr='{bar: "bar"}'`

  const result = serializeTokens(tokens)
  expect(result).toEqual(expectedSerializedString)
})
