'use strict';

const variableMarkerReg = /%[sd]/gm;
const variablePositionMarkerReg = /%\d+\$[sd]/gm;

const translationFiles = {};

function getReportNode(argNode, node) {
    return argNode || node.callee;
}

function isStringLiteral(node) {
    return node && node.type === 'Literal' && typeof node.value === 'string';
}

const hasMultipleVaribles = (str) => {
    if (str.match(variableMarkerReg) && str.match(variablePositionMarkerReg)) {
        return true;
    }

    return str.split(variableMarkerReg).length >= 3;
};

function isI18nAPICall(node, methodName) {
    const { callee } = node;

    return (
        (node.type === 'CallExpression' &&
            callee.type === 'MemberExpression' &&
            callee.property.type === 'Identifier' &&
            callee.property.name === methodName) ||
        (callee.type === 'Identifier' && callee.name === methodName)
    );
}

function checkRequiredArgument(context, node, argNum) {
    const args = node.arguments;
    const msg = `Here required ${argNum} arguments, actually get \
${args.length} arguments.`;
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

function getTranslations(filename, translationContext) {
    if (!translationFiles[filename]) {
        const gettextParser = require('gettext-parser');

        const input = require('fs').readFileSync(filename);
        translationFiles[filename] = gettextParser.po.parse(input).translations;
    }

    return translationFiles[filename][translationContext || ''];
}

function isRegisteredTranslatable(context, literal, translationContext) {
    const { poFilename } = context.settings;
    const translations = getTranslations(poFilename, translationContext);
    return Object.keys(translations).findIndex((i) => i === literal) !== -1;
}

function isRegisteredPlural(context, literal, translationContext, nonPlural) {
    const { poFilename } = context.settings;
    const translations = getTranslations(poFilename, translationContext);
    const entry = translations[nonPlural];
    return entry && entry.msgid_plural === literal;
}

module.exports = {
    checkRequiredArgument,
    isStringLiteral,
    isI18nAPICall,
    getReportNode,
    hasMultipleVaribles,
    isRegisteredTranslatable,
    isRegisteredPlural,
};
