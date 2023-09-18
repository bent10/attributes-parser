# Attributes Parser

A utility for parsing and tokenizing attributes string into meaningful tokens and key-value pairs.

## Install

You can install this module using npm or yarn:

```bash
npm i attributes-parser

# or

yarn add attributes-parser
```

## Usage

### Parse Attributes

To parse an attribute string into key-value pairs, use the `parseAttrs` function.

```js
import { parseAttrs } from 'attributes-parser'

const attrs = `id="foo" class=\'bar\' num="3.14" data-value=baz name="@myName" data-value="[1, 2, 3]" fooBar="{foo: 'bar'}" checked=false disabled`
const parsedAttrs = parseAttrs(attrs)

console.log(parsedAttrs)
```

Yields:

```js
{
  id: 'foo',
  class: 'bar',
  num: 3.14,
  'data-value': [ 1, 2, 3 ],
  name: '@myName',
  fooBar: { foo: 'bar' },
  checked: false,
  disabled: true
}
```

### Tokenize Attributes

To tokenize an attribute string, use the `tokenizeAttrs` function.

```js
import { tokenizeAttrs } from 'attributes-parser'

const attrs = `id="foo" class=\'bar\' num="3.14" data-value=baz name="@myName" data-value="[1, 2, 3]" fooBar="{foo: 'bar'}" checked=false disabled`
const tokens = tokenizeAttrs(attributeString)

console.log(tokens)
```

Yields:

```js
[
  {
    type: 'name',
    value: 'id',
    text: 'id',
    toString: [Function: tokenToString],
    offset: 0,
    lineBreaks: 0,
    line: 1,
    col: 1
  },
  {
    type: 'separator',
    value: '=',
    text: '=',
    toString: [Function: tokenToString],
    offset: 2,
    lineBreaks: 0,
    line: 1,
    col: 3
  },
  {
    type: 'doubleQuotedvalue',
    value: 'foo',
    text: '"foo"',
    toString: [Function: tokenToString],
    offset: 3,
    lineBreaks: 0,
    line: 1,
    col: 4
  },
  ...
]
```

### Serialize Tokens

To serialize an array of tokens into a string, use the `serializeTokens` function.

```ts
import { serializeTokens, type Token } from 'attributes-parser'

const tokens = [
  { type: 'name', value: 'id', text: 'id' },
  { type: 'separator', value: '=', text: '=' },
  { type: 'unquotedvalue', value: 'foo', text: 'foo' },
  { type: 'whitespace', value: ' ', text: ' ' },
  { type: 'name', value: 'class', text: 'class' },
  { type: 'separator', value: '=', text: '=' },
  { type: 'doubleQuotedvalue', value: 'bar', text: '"bar"' }
] as Token[]
const attrs = serializeTokens(tokens)

console.log(attrs)
```

Yields:

```bash
id=foo class="bar"
```

## Attribute Validation

This module ensure that attribute names and values adhere to the syntax rules:

- Follows the HTML specification for valid attribute names and values. It uses regular expressions to validate and tokenize attributes based on the rules defined in the specification.

- Valid attribute names and values will be correctly tokenized and parsed, providing you with meaningful results.

- Invalid attributes that do not adhere to HTML syntax rules may result in unexpected behavior. It's essential to ensure that the input attributes string comply with HTML standards to get accurate results.

- If an attributes string contains invalid characters or does not follow the HTML syntax for attributes, the parsing may not produce the desired output.

It is better to validate and sanitize your attributes string to ensure they conform to HTML standards before using this module for parsing. For more information on HTML syntax attributes, refer to the [HTML syntax attributes specification](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes).

Below are the test cases that demonstrate valid and invalid attribute patterns according to these rules:

### Attribute names

#### Valid

- `validname`
- `validName`
- `valid_name`
- `valid-name`
- `valid42`
- `valid-42`
- `-valid`
- `_valid`
- `$valid`
- `@valid`
- `valid@name`
- `:valid`
- `valid:name`

#### Invalid

- `\x07Fvalid` (Contains prohibited character)
- `invalid name` (Contains space character)
- `"invalidName"` (Contains prohibited character)
- `name>` (Contains prohibited character)
- `name=` (Contains prohibited character)
- `name\x00` (Contains prohibited character)
- `name\n` (Contains prohibited character)

### Single-quoted attribute values

#### Valid

- `'valid value'`
- `"valid@value"`
- `'valid & value'`
- `'valid &; value'`
- `'42'`
- `'-42'`
- `'3.14'`
- `'0.5'`
- `'-0.5'`
- `'.5'`
- `'escaped single quote: \\''`
- `'newline: \n'`
- `'escaped newline: \\n'`
- `'[1, 2, 3]'`
- `'{foo: "bar"}'`

#### Invalid

- `'invalid value"` (Contains prohibited character)
- `'invalid value''` (Contains prohibited character)
- `'invalid &value;'` (Contains an ambiguous ampersand, e.g. `&amp;`)

### Double-quoted attribute values

#### Valid

- `"valid value"`
- `"valid@value"`
- `"valid & value"`
- `"valid &; value"`
- `"42"`
- `"-42"`
- `"3.14"`
- `"0.5"`
- `"-0.5"`
- `".5"`
- `"escaped double quote: \""`
- `"newline: \n"`
- `"escaped newline: \n"`
- `"[1, 2, 3]"`
- `"{foo: 'bar'}"`

#### Invalid

- `"invalid value'` (Contains prohibited character)
- `"invalid value""` (Contains prohibited character)
- `"invalid &value;"` (Contains an ambiguous ampersand, e.g. `&amp;`)

### Unquoted attribute values

#### Valid

- `validValue`
- `valid@value`
- `"42"`
- `"-42"`
- `"3.14"`
- `"0.5"`
- `"-0.5"`
- `".5"`
- `true`
- `false`

#### Invalid

- `invalid value` (Contains prohibited character)
- `value"` (Contains prohibited character)
- `value'` (Contains prohibited character)
- `value`\` (Contains prohibited character)
- `=value` (Contains prohibited character)
- `value>` (Contains prohibited character)
- `value<` (Contains prohibited character)
- `value\x00` (Contains prohibited character)
- `value\n` (Contains prohibited character)

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## License

![GitHub](https://img.shields.io/github/license/bent10/attributes-parser)

A project by [Stilearning](https://stilearning.com) &copy; 2023.
