'use strict';

module.exports = {
    rules: {
        'no-variable-string': require('./lib/rules/no-variable-string'),
        'required-positional-markers-for-multiple-variables': require('./lib/rules/required-positional-markers-for-multiple-variables'),
        'has-translation-msgid': require('./lib/rules/has-translation-msgid'),
    },
    rulesConfig: {
        'no-variable-string': 0,
    },
};
