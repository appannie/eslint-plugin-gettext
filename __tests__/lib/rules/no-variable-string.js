'use strict';

const ruleNoVariableString = require('../../../lib/rules/no-variable-string');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();
const invalidMessage =
    'Unexpected argument, gettext function only allows string literals as arguments.';

ruleTester.run('no-variable-string', ruleNoVariableString, {
    valid: [
        "gettext('hello')",
        "i18n.gettext('hello')",
        "ngettext('cat', '%d cats', 5)",
        "ngettext('cat', '%d cats', count)",
        "i18n.ngettext('cat', '%d cats', 5)",
        "pgettext('homepage', 'hello')",
        "i18n.pgettext('homePage', 'hello')",
        "npgettext('homepage', 'cat', '%d cats', 5)",
        "i18n.npgettext('homepage', 'cat', '%d cats', 5)",
    ],
    invalid: [
        {
            code: 'gettext()',
            errors: [
                {
                    message: 'Here required 1 arguments, actually get 0 arguments.',
                    type: 'Identifier',
                },
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: 'gettext(undefined)',
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: 'gettext(null)',
            errors: [
                {
                    message: 'Here should require valid arguments, not null',
                    type: 'Literal',
                },
                {
                    message:
                        'Unexpected argument, gettext function only allows string literals as arguments.',
                    type: 'Literal',
                },
            ],
        },
        {
            code: 'gettext(123)',
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: 'gettext(hello)',
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: "gettext('hello' + 'world')",
            errors: [
                {
                    message: invalidMessage,
                    type: 'BinaryExpression',
                },
            ],
        },
        {
            code: 'i18n.gettext(hello)',
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: 'ngettext()',
            errors: [
                {
                    message: 'Here required 3 arguments, actually get 0 arguments.',
                    type: 'Identifier',
                },
                {
                    message: 'Here required 3 arguments, actually get 0 arguments.',
                    type: 'Identifier',
                },
                {
                    message: 'Here required 3 arguments, actually get 0 arguments.',
                    type: 'Identifier',
                },
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: "ngettext('cats', 5)",
            errors: [
                {
                    message: 'Here required 3 arguments, actually get 2 arguments.',
                    type: 'Identifier',
                },
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: 'ngettext(undefined, 123, 5)',
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "ngettext(null, 'cats', 5)",
            errors: [
                {
                    message: 'Here should require valid arguments, not null',
                    type: 'Literal',
                },
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "ngettext(cat, 'cats', 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: "ngettext('cat', cats, 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: "pgettext(homepage, 'hello')",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: 'pgettext(123, 456)',
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "pgettext('homepage', hello)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: "npgettext(null, 'cat', 'cats', 5)",
            errors: [
                {
                    message: 'Here should require valid arguments, not null',
                    type: 'Literal',
                },
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "npgettext(undefined, 'cat', 'cats', 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: "npgettext('my', 'cat', cats, 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: "npgettext(homepage, 'cat', 'cats', 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
        {
            code: "npgettext('homepage', cat, '%d cats', 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Identifier',
                },
            ],
        },
    ],
});
