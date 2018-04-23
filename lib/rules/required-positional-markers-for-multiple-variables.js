'use strict';

const utils = require('../utils');

const errorMsg =
    'Invalid variables, need adding sprintf positional markers on the variables, like %1$s, %2$d';

const i18nMethodMap = {
    gettext(context, node) {
        const keyTxt = node.arguments[0];

        if (utils.isStringLiteral(keyTxt)) {
            const reportNode = utils.getReportNode(keyTxt, node);
            if (utils.hasMultipleVaribles(keyTxt.value)) {
                context.report(reportNode, errorMsg);
                return true;
            }
            return false;
        }

        return false;
    },
    ngettext(context, node) {
        const keyTxt = node.arguments[0];
        const pluralTxt = node.arguments[1];

        if (utils.isStringLiteral(keyTxt) && utils.hasMultipleVaribles(keyTxt.value)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            return true;
        }

        if (
            utils.isStringLiteral(pluralTxt) &&
            utils.hasMultipleVaribles(pluralTxt.value)
        ) {
            context.report(utils.getReportNode(pluralTxt, node), errorMsg);
            return true;
        }

        return false;
    },
    pgettext(context, node) {
        const keyTxt = node.arguments[1];

        if (utils.isStringLiteral(keyTxt) && utils.hasMultipleVaribles(keyTxt.value)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            return true;
        }

        return false;
    },
    npgettext(context, node) {
        const keyTxt = node.arguments[1];
        const pluralTxt = node.arguments[2];

        if (utils.isStringLiteral(keyTxt) && utils.hasMultipleVaribles(keyTxt.value)) {
            context.report(utils.getReportNode(keyTxt, node), errorMsg);
            return true;
        }

        if (
            utils.isStringLiteral(pluralTxt) &&
            utils.hasMultipleVaribles(pluralTxt.value)
        ) {
            context.report(utils.getReportNode(pluralTxt, node), errorMsg);
            return true;
        }

        return false;
    },
};

module.exports = {
    meta: {
        docs: {
            description:
                'Required adding sprintf positional markers to the variables if a string contains more than a single marker ',
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
