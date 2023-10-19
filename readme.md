# Attributes Parser

A utility for parsing and tokenizing attributes string into meaningful tokens and key-value pairs.

## Install

You can install this module using npm or yarn, it's only `2.68 kB | min: 1.10 kB`:

```bash
npm i attributes-parser
# or
yarn add attributes-parser
```

Alternatively, you can also include this module directly in your HTML file from [CDN](https://www.jsdelivr.com/package/npm/attributes-parser?tab=files&path=dist):

```html
<script type="module">
  import parseAttrs from 'https://cdn.jsdelivr.net/npm/attributes-parser/+esm'
</script>
```

## Usage

```js
import parseAttrs from 'attributes-parser'

const attr = `id="my-id" class='my-class' num=3.14 numNeg=-3.14 data-num="3.14" data-value="123" data-value=1_000_000 options=\'{"key": "value", "array": [1, 2, 3]}\' data-list="[1, 2, 3]" punc="a=b,c,d,e" checked=false checked=false data-checked="false" disabled`
const parsedAttr = parseAttrs(attr)

console.log(parsedAttr)
// use `parsedAttr.toString()` to turn it back into a string
// use `parsedAttr.getTokens()` to get the tokens array
```

Yields:

```js
{
  id: 'my-id',
  class: 'my-class',
  num: 3.14,  // number
  numNeg: -3.14,  // negative number
  'data-num': '3.14',  // preserve string
  'data-value': 1000000,  // duplicate key, second value is kept
  options: { key: 'value', array: [ 1, 2, 3 ] },
  'data-list': [ 1, 2, 3 ],
  punc: 'a=b,c,d,e',  // allowed, no ambiguous ampersand
  checked: false,  // boolean
  'data-checked': 'false',  // preserve string
  disabled: "disabled"  // shorthand
}
```

## Attribute Validation

This module ensure that attribute names and values adhere to the syntax rules:

- Follows the HTML specification for valid attribute names and values. It uses regular expressions to validate and tokenize attributes based on the rules defined in the specification.

- Valid attribute names and values will be correctly tokenized and parsed, providing you with meaningful results.

- Invalid attributes that do not adhere to HTML syntax rules may result in unexpected behavior. It's essential to ensure that the input attributes string comply with HTML standards to get accurate results.

- If an attributes string contains invalid characters or does not follow the HTML syntax for attributes, the parsing may not produce the desired output.

It is better to validate and sanitize your attributes string to ensure they conform to HTML standards before using this module for parsing. For more information on HTML syntax attributes, refer to the [HTML syntax attributes specification](https://www.w3.org/TR/2011/WD-html5-20110525/syntax.html#syntax-attributes).

Below are the test cases that demonstrate valid and invalid attribute patterns according to these rules:

### `AttributeName`

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

### `BooleanLiteral`

- `true`
- `false`

### `NumericLiteral`

#### Valid

- `0x1A3` (hexLiteral)
- `0o755` (octalLiteral)
- `0b1101` (binaryLiteral)
- `123.456` (decimalLiteral)
- `1.23e-45` (scientificLiteral)
- `0` (zeroLiteral)
- `1_000_000` (underscoredLiteral)
- `42` (integerLiteral)
- `1e3` (scientificNoFraction)

#### Invalid

- `12.34e` (scientificNoExponent)

### `StringLiteral` (Single-quoted)

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

### `StringLiteral` (Double-quoted)

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

### `StringLiteral` (Unquoted)

#### Valid

- `validValue`
- `valid@value`
- `42`
- `-42`
- `3.14`
- `0.5`
- `-0.5`
- `.5`
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

## Related

- [json-loose](https://github.com/bent10/json-loose) – Transforms loosely structured plain object strings into valid JSON strings.

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
