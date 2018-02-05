'use strict'

const console2 = require('../console2')

class PredictCommand {

    constructor(model){
        this.predict = require(model)
        console2.success("[MODEL SUCCESSFULLY LOADED]")
    }

    run(input){
        const predictor = this.predict

        if (input !== '-'){
            console.log(predictor(input))
            return predictor
        }

        const stdin = process.openStdin()
        stdin.addListener('data', function(raw_input) {
            console.log(predictor(raw_input.toString().trim()))
        })

        return predictor
    }

}

module.exports = (model, input) => {
    const command = new PredictCommand(model)
    command.run(input)

    return command
}