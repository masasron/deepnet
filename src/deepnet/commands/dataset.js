'use strict'

const fs = require('fs')
const console2 = require('../../console2')
const vectorize = require('../../vectorize')

class DatasetCommand {

    constructor(positive_dataset_file, negative_dataset_file, options){
        this.options = options
        this.positive_dataset_file = positive_dataset_file
        this.negative_dataset_file = negative_dataset_file
    }

    run(){
        const output = []

        this.readLines(this.positive_dataset_file).forEach( line => output.push({input: this.vectorizeIfNeeded(line), output: [1]}) )
        this.readLines(this.negative_dataset_file).forEach( line => output.push({input: this.vectorizeIfNeeded(line), output: [0]}) )
        
        const file_name = `${this.options.name}.json`

        fs.writeFileSync(file_name, JSON.stringify(output), 'utf8')

        console2.success(`Dataset file was successfully created.`)
                .log(`file: ${file_name}\n`)
    }

    vectorizeIfNeeded(input){
        return typeof input == 'string' && this.options.vectorize ? vectorize(input) : input
    }

    readLines(file){
        return fs.readFileSync(file, 'utf8').split('\n')
    }

}

module.exports = (positive_dataset_file, negative_dataset_file, options) => {
    const command = new DatasetCommand(positive_dataset_file, negative_dataset_file, options)
    return command.run()
}