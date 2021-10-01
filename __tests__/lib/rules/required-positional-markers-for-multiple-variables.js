'use strict';

const ruleRequiredPositionalMarkersForMultipleVariables = require('../../../lib/rules/required-positional-markers-for-multiple-variables');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

const invalidMessage =
    'Invalid variables, need adding sprintf positional markers on the variables, like %1$s, %2$d';

ruleTester.run(
    'required-positional-markers-for-multiple-variables',
    ruleRequiredPositionalMarkersForMultipleVariables,
    {
        valid: [
            'abc()',
            "gettext('There is %d more event in the game.')",
            'gettext(rule)',
            "i18n.gettext('There is %d more event in the game.')",
            "i18n.gettext('There is %1$d more event in the %2$s.')",
            "ngettext('cat %s', '%d cats', 5)",
            "ngettext('cat %1$s $2$s', '%1$d cats %2$d dogs', count)",
            "pgettext('homepage', 'hello %d')",
            'pgettext(ctx, text)',
            "npgettext('homepage', 'cat', '%d cats', 5)",
        ],
        invalid: [
            {
                code: "gettext('There is %d more event in the %s.')",
                errors: [
                    {
                        message: invalidMessage,
                        type: 'Literal',
                    },
                ],
            },
            {
                code: "gettext('There is %d more event in the %1$s.')",
                errors: [
                    {
                        message: invalidMessage,
                        type: 'Literal',
                    },
                ],
            },
            {
                code: "ngettext('cat', '%d cats %d dogs', count)",
                errors: [
                    {
                        message: invalidMessage,
                        type: 'Literal',
                    },
                ],
            },
            {
                code: "ngettext('cat %d and %s', 'cats', count)",
                errors: [
                    {
                        message: invalidMessage,
                        type: 'Literal',
                    },
                ],
            },
            {
                code: "pgettext('homepage', 'hello %d my name is %s')",
                errors: [
                    {
                        message: invalidMessage,
                        type: 'Literal',
                    },
                ],
            },
            {
                code: "npgettext('homepage', 'cat', 'cat %d and %s dog', 5)",
                errors: [
                    {
                        message: invalidMessage,
                        type: 'Literal',
                    },
                ],
            },
            {
                code: "npgettext('homepage', 'cat %s and dog %d', 'cats and dogs', 5)",
                errors: [
                    {
                        message: invalidMessage,
                        type: 'Literal',
                    },
                ],
            },
        ],
    }
);
