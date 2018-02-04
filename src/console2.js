'use strict'

const console2 = {
    log: (str,color = 37) => {
        console.log(`\x1b[${color}m${str}\x1b[0m`)
        return console2
    },
    error: str => console2.log(str,31), // Red
    success: str => console2.log(str,32), // Green
    warning: str => console2.log(str,33), // Yellow
    info: str => console2.log(str,34) // Blue
}

module.exports = console2