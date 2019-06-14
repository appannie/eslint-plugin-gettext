'use strict';

const utils = require('../utils');

const errorMsg =
    'Unexpected single quote, gettext function only allows usage of closing single quotes.';

const i18nMethodMap = {
    gettext(context, node) {
        utils.checkRequiredArgument(context, node, 1);

        const keyTxt = node.arguments[0];
        if (utils.hasSingleQuoteInString(keyTxt)) {
            const reportNode = utils.getReportNode(keyTxt, node);
            context.report(reportNode, errorMsg);
            return true;
        }
        return false;
    },
    ngettext(context, node) {
        utils.checkRequiredArgument(context, node, 3);

        let catchError = false;
        const keyTxt = node.arguments[0];
        const pluralTxt = node.arguments[1];

        if (utils.hasSingleQuoteInString(keyTxt)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        if (utils.hasSingleQuoteInString(pluralTxt)) {
            context.report(utils.getReportNode(pluralTxt, node), errorMsg);
            catchError = true;
        }

        return catchError;
    },
    pgettext(context, node) {
        utils.checkRequiredArgument(context, node, 2);

        let catchError = false;
        const keyTxt = node.arguments[1];

        if (utils.hasSingleQuoteInString(keyTxt)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        return catchError;
    },
    npgettext(context, node) {
        utils.checkRequiredArgument(context, node, 4);

        let catchError = false;
        const keyTxt = node.arguments[1];
        const pluralTxt = node.arguments[2];

        if (utils.hasSingleQuoteInString(keyTxt)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        if (utils.hasSingleQuoteInString(pluralTxt)) {
            context.report(utils.getReportNode(pluralTxt, node), errorMsg);
            catchError = true;
        }

        return catchError;
    },
};

module.exports = {
    meta: {
        docs: {
            description:
                'Translated string literals should not contain a regular single quote. A closing single quote should be used instead.',
            recommended: false,
        },
        fixable: null,
        schema: [],
    },

    create: function(context) {
        return {
            CallExpression(node) {
                Object.keys(i18nMethodMap).find(apiName => {
                    if (utils.isI18nAPICall(node, apiName)) {
                        return i18nMethodMap[apiName](context, node);
                    }
                    return false;
                });
            },
        };
    },
};
