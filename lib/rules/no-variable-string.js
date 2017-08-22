'use strict';

const errorMsg =
    'Unexpected argument, gettext function only allows string literals as arguments.';

function getReportNode(argNode, node) {
    return argNode || node.callee;
}

const i18nMethodMap = {
    gettext(context, node) {
        checkRequiredArgument(context, node, 1);

        const keyTxt = node.arguments[0];
        if (!isStringLiteral(keyTxt)) {
            const reportNode = getReportNode(keyTxt, node);
            context.report(reportNode, errorMsg);
            return true;
        }
        return false;
    },
    ngettext(context, node) {
        checkRequiredArgument(context, node, 3);

        let catchError = false;
        const keyTxt = node.arguments[0];
        const pluralTxt = node.arguments[1];

        if (!isStringLiteral(keyTxt)) {
            context.report(getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        if (!isStringLiteral(pluralTxt)) {
            context.report(getReportNode(pluralTxt, node), errorMsg);
            catchError = true;
        }

        return catchError;
    },
    pgettext(context, node) {
        checkRequiredArgument(context, node, 2);

        let catchError = false;
        const ctxTxt = node.arguments[0];
        const keyTxt = node.arguments[1];

        if (!isStringLiteral(ctxTxt)) {
            context.report(getReportNode(ctxTxt, node), errorMsg);
            catchError = true;
        }

        if (!isStringLiteral(keyTxt)) {
            context.report(getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        return catchError;
    },
    npgettext(context, node) {
        checkRequiredArgument(context, node, 4);

        let catchError = false;
        const ctxTxt = node.arguments[0];
        const keyTxt = node.arguments[1];
        const pluralTxt = node.arguments[2];

        if (!isStringLiteral(ctxTxt)) {
            context.report(getReportNode(ctxTxt, node), errorMsg);
            catchError = true;
        }

        if (!isStringLiteral(keyTxt)) {
            context.report(getReportNode(keyTxt, node), errorMsg);
            catchError = true;
        }

        if (!isStringLiteral(pluralTxt)) {
            context.report(getReportNode(pluralTxt, node), errorMsg);
            catchError = true;
        }

        return catchError;
    },
};

function isI18nAPICall(node, methodName) {
    const callee = node.callee;

    return (
        (node.type === 'CallExpression' &&
            callee.type === 'MemberExpression' &&
            callee.property.type === 'Identifier' &&
            callee.property.name === methodName) ||
        (callee.type === 'Identifier' && callee.name === methodName)
    );
}

function isStringLiteral(node) {
    return node && node.type === 'Literal' && typeof node.value === 'string';
}

function checkRequiredArgument(context, node, argNum) {
    const args = node.arguments;
    const msg = `Here required ${argNum} arguments, actually get ${args.length} arguments.`;
    const nullMsg = 'Here should require valid arguments, not null';
    for (let i = 0; i < argNum; i += 1) {
        const argValue = args[i];
        if (argValue === undefined) {
            context.report(node.callee, msg);
        }
        if (argValue && argValue.value === null) {
            context.report(argValue, nullMsg);
        }
    }
}

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

    create: function(context) {
        return {
            CallExpression(node) {
                Object.keys(i18nMethodMap).find(apiName => {
                    if (isI18nAPICall(node, apiName)) {
                        return i18nMethodMap[apiName](context, node);
                    }
                    return false;
                });
            },
        };
    },
};
