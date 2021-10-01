'use strict';

const utils = require('../utils');

const errorMsg =
    'Unexpected argument, gettext function only allows string literals as arguments.';

const i18nMethodMap = {
    gettext(context, node) {
        utils.checkRequiredArgument(context, node, 1);

        const keyTxt = node.arguments[0];
        if (!utils.isStringLiteral(keyTxt)) {
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

        if (!utils.isStringLiteral(keyTxt)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        if (!utils.isStringLiteral(pluralTxt)) {
            context.report(utils.getReportNode(pluralTxt, node), errorMsg);
            catchError = true;
        }

        return catchError;
    },
    pgettext(context, node) {
        utils.checkRequiredArgument(context, node, 2);

        let catchError = false;
        const ctxTxt = node.arguments[0];
        const keyTxt = node.arguments[1];

        if (!utils.isStringLiteral(ctxTxt)) {
            context.report(utils.getReportNode(ctxTxt, node), errorMsg);
            catchError = true;
        }

        if (!utils.isStringLiteral(keyTxt)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        return catchError;
    },
    npgettext(context, node) {
        utils.checkRequiredArgument(context, node, 4);

        let catchError = false;
        const ctxTxt = node.arguments[0];
        const keyTxt = node.arguments[1];
        const pluralTxt = node.arguments[2];

        if (!utils.isStringLiteral(ctxTxt)) {
            context.report(utils.getReportNode(ctxTxt, node), errorMsg);
            catchError = true;
        }

        if (!utils.isStringLiteral(keyTxt)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        if (!utils.isStringLiteral(pluralTxt)) {
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
                'Should only translate string literal. Variable/Null/Undefined/Number is not allowed',
            recommended: false,
        },
        fixable: null,
        schema: [],
    },

    create(context) {
        return {
            CallExpression(node) {
                Object.keys(i18nMethodMap).find((apiName) => {
                    if (utils.isI18nAPICall(node, apiName)) {
                        return i18nMethodMap[apiName](context, node);
                    }

                    return false;
                });
            },
        };
    },
};
