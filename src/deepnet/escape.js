'use strict'

const regexEscape = str => {
    if (!arguments.callee.sRE) {
        var specials = [
            '/', '.', '*', '+', '?', '|',
            '(', ')', '[', ']', '{', '}', '\\'
        ];
        arguments.callee.sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'gim');
    }

    return str.replace(arguments.callee.sRE, '\\$1');
}

module.exports = regexEscape