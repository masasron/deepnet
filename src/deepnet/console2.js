'use strict'

const Colors = {
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    magenta: 45,
    cyan: 46,
    white: 47
}

let background = null

const console2 = {
    log: (str,color = 37) => {

        if (background){
            str = `\x1b[${Colors[background]}m${str}`
            background = null
        }

        if (color){
            str = `\x1b[${color}m${str}`
        }

        console.log(`${str}\x1b[0m`)

        return console2
    },
    error: str => console2.log(str,31), // Red
    success: str => console2.log(str,32), // Green
    warning: str => console2.log(str,33), // Yellow
    info: str => console2.log(str,34), // Blue
    bg: color => {
        background = color
        return console2
    }
}

module.exports = console2