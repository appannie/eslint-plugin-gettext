'use strict';

const ruleNoSingleQuote = require('../../../lib/rules/no-single-quotes');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
const invalidMessage =
    'Unexpected single quote, gettext function only allows usage of closing single quotes.';

ruleTester.run('no-single-quotes', ruleNoSingleQuote, {
    valid: [
        "gettext('Don’t do it')",
        "i18n.gettext('Don’t do it')",
        "ngettext('cat’s paw', '%d cat’s paws', 5)",
        "ngettext('cat’s paw', '%d cat’s paws', count)",
        "i18n.ngettext('cat’s paw', '%d cat’s paws', 5)",
        "pgettext('homepage', 'Don’t do it')",
        "i18n.pgettext('homePage', 'Don’t do it')",
        "npgettext('homepage', 'cat’s paw', '%d cat’s paws', 5)",
        "i18n.npgettext('homepage', 'cat’s paw', '%d cat’s paws', 5)",
        'gettext(undefined)',
        'gettext(123)',
        'gettext(hello)',
        'i18n.gettext(hello)',
        'pgettext(123, 456)',
        "pgettext('homepage', hello)",
        "pgettext('cat\\'s paw', 'whatever')",
        "npgettext('cat\\'s paw', 'whatever', '%d whatevers', 5)",
    ],
    invalid: [
        {
            code: 'gettext()',
            errors: [
                {
                    message: 'Here required 1 arguments, actually get 0 arguments.',
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
            ],
        },
        {
            code: 'gettext("don\'t do it")',
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
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
            ],
        },
        {
            code: "ngettext('cat\\'s paw', 5)",
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
            code: "ngettext(null, 'cat\\'s paw', 5)",
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
            code: "ngettext(cat, 'cat\\'s paw', 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "ngettext('cat\\'s paw', cats, 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "pgettext(homepage, 'hello cat\\'s paw')",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "npgettext(null, 'cat\\'s paw', 'cat\\'s paws', 5)",
            errors: [
                {
                    message: 'Here should require valid arguments, not null',
                    type: 'Literal',
                },
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
            code: "npgettext(undefined, 'cat\\'s paw', 'cat\\'s paws', 5)",
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
            code: "npgettext('my', 'cat\\'s paw', cats, 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "npgettext(homepage, 'cat\\'s paw', 'cat\\'s paws', 5)",
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
            code: "npgettext('homepage', cat, '%d cat\\'s paws', 5)",
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
    ],
});
