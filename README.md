# eslint-plugin-gettext [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

[Gettext](https://en.wikipedia.org/wiki/Gettext) linting rules for ESLint.

We're using this rule to lint against misuse of the [jed gettext integration](https://github.com/messageformat/Jed) and the [django JS catalog](https://docs.djangoproject.com/en/1.11/topics/i18n/translation/#internationalization-in-javascript-code); so we're confident it should work against any gettext integration.

## Installation

1. Install [ESLint](https://www.github.com/eslint/eslint).
1. Install [eslint-plugin-gettext](https://github.com/appannie/eslint-plugin-gettext) plugin.

```sh
npm install eslint --save-dev
npm install eslint-plugin-gettext --save-dev
```

## Configuration

1. Load plugin.
1. Enable rules.

```json
{
  "plugins": ["gettext"],
  "rules": {
    "gettext/no-variable-string": "error",
    "gettext/required-positional-markers-for-multiple-variables": "error"
  }
}
```

## Rules

### `gettext/no-variable-string`

Disallow non literal strings inside common `gettext` functions. This is a very common mistake that disallow translation system from statically collecting the translatable strings.

```js
// Disallows any non string literals in string reserved fields:
gettext(variable)
gettext(123)
ngettext(varA, varB, 5)
pgettext(varA, varB)
npgettext(varA, varB, varC, 5)

// Allows:
gettext('hello')
ngettext('cat', '%d cats', 5)
pgettext('homepage', 'hello')
npgettext('homepage', 'cat', '%d cats', 5)
i18n.gettext('hello') // any object can expose the gettext API
this.gettext('hello')
```

### `gettext/required-positional-markers-for-multiple-variables`

Require that all strings containing multiple variables also includes positional marker. This allows translator to reorder variables, and prevents `sprintf()` errors if someone change the order of `%s` and `%d`.

```js
// Disallows:
gettext('There is %d more event in the %s.')
gettext('There is %d more event in the %1$s.')

// Allows:
gettext('There is %d more event in the game.')
ngettext('cat %1$s $2$s', '%1$d cats %2$d dogs', count)
```

## License

MIT © [App Annie](https://www.appannie.com/en/about/careers/engineering/)

[npm-image]: https://badge.fury.io/js/eslint-plugin-gettext.svg
[npm-url]: https://npmjs.org/package/eslint-plugin-gettext
[travis-image]: https://travis-ci.org/appannie/eslint-plugin-gettext.svg?branch=master
[travis-url]: https://travis-ci.org/appannie/eslint-plugin-gettext
[daviddm-image]: https://david-dm.org/appannie/eslint-plugin-gettext.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/appannie/eslint-plugin-gettext
[coveralls-image]: https://coveralls.io/repos/appannie/eslint-plugin-gettext/badge.svg
[coveralls-url]: https://coveralls.io/r/appannie/eslint-plugin-gettext
