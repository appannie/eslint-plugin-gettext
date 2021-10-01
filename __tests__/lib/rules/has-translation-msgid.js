'use strict';

const ruleNoMissingMsgId = require('../../../lib/rules/has-translation-msgid');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();
const invalidMessage = 'String literal not in .po file.';

ruleTester.run('has-translation-msgid', ruleNoMissingMsgId, {
    valid: [
        {
            code: "gettext('hello')",
            settings: { poFilename: '__tests__/hello.po' },
        },
        {
            code: "ngettext('hello', 'hellos', 5)",
            settings: { poFilename: '__tests__/hello.po' },
        },
        {
            code: "pgettext('homepage', 'hi')",
            settings: { poFilename: '__tests__/hello.po' },
        },
        {
            code: "npgettext('homepage', 'hi', 'his', 5)",
            settings: { poFilename: '__tests__/hello.po' },
        },
        // These are ignored as they are reported by no-variable-string
        {
            code: 'gettext(1)',
            settings: { poFilename: '__tests__/hello.po' },
        },
        {
            code: "ngettext(1, 'hellos', 5)",
            settings: { poFilename: '__tests__/hello.po' },
        },
        {
            code: "ngettext('hello', 1, 5)",
            settings: { poFilename: '__tests__/hello.po' },
        },
        {
            code: "pgettext(1, 'hi')",
            settings: { poFilename: '__tests__/hello.po' },
        },
        {
            code: "npgettext(1, 'hi', 'his', 5)",
            settings: { poFilename: '__tests__/hello.po' },
        },
        {
            code: "npgettext('homepage', 'hi', 1, 5)",
            settings: { poFilename: '__tests__/hello.po' },
        },
    ],
    invalid: [
        {
            code: "gettext('goodbye')",
            settings: { poFilename: '__tests__/hello.po' },
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "ngettext('good', 'bye', 5)",
            settings: { poFilename: '__tests__/hello.po' },
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
            code: "ngettext('hello', 'bye', 5)",
            settings: { poFilename: '__tests__/hello.po' },
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "pgettext('homepage', 'goodbye')",
            settings: { poFilename: '__tests__/hello.po' },
            errors: [
                {
                    message: invalidMessage,
                    type: 'Literal',
                },
            ],
        },
        {
            code: "npgettext('homepage', 'good', 'bye', 5)",
            settings: { poFilename: '__tests__/hello.po' },
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
    ],
});
