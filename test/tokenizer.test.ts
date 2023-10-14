/// <reference types="vitest/globals" />

import { tokenizeAttrs } from '../src/index.js'

it('should tokenize a string of attributes', () => {
  const input = `id="my-id" class='my-class' num=3.14 numNeg=-3.14 data-num="3.14" data-value="123" data-value=1_000_000 options=\'{"key": "value", "array": [1, 2, 3]}\' data-list="[1, 2, 3]" punc="a=b,c,d,e" checked=false checked=false data-checked="false" disabled`

  const tokens = tokenizeAttrs(input)
  expect(tokens).toMatchSnapshot()
})
