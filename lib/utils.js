'use strict';

function getReportNode(argNode, node) {
    return argNode || node.callee;
}

function isStringLiteral(node) {
    return node && node.type === 'Literal' && typeof node.value === 'string';
}

const hasMultipleVaribles = str => {
    if (str.match(/%[sd]/gm) && str.match(/%\d+\$(s|d)/gm)) {
        return true;
    }

    return str.split(/%[sd]/gm).length >= 3;
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
    checkRequiredArgument: checkRequiredArgument,
    isStringLiteral: isStringLiteral,
    isI18nAPICall: isI18nAPICall,
    getReportNode: getReportNode,
    hasMultipleVaribles: hasMultipleVaribles,
};
