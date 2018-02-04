'use strict'

const fs = require('fs')

const brain = require('brain.js')
const shuffle = require('./shuffle')
const console2 = require('./console2')
const vectorize = require('./vectorize')

const readLines = file => fs.readFileSync(file, 'utf8').split('\n')

const DeepNet = {

    /**
     * Use a model to predict results given an input.
     * 
     * @param {string} model
     * @param {string} input
     * 
     * @returns {function}
     */  
    predict: (model,input) => {
        const predict = require(model)

        console2.success("[MODEL SUCCESSFULLY LOADED]")

        if (input !== '-'){
            console.log(predict(input))
            return predict
        }

        const stdin = process.openStdin()
        stdin.addListener('data', function(raw_input) {
            console.log(predict(raw_input.toString().trim()))
        })

        return predict
    },

    /**
     * Make a deepnet compatible dataset given a list of positive and negative expressions. 
     * 
     * @param {string} positive_dataset_file
     * @param {string} negative_dataset_file
     * @param {object} options
     */
    dataset: (positive_dataset_file,negative_dataset_file, options) => {
        const output = []
        const vectorizeIfNeeded = input => typeof input == 'string' && options.vectorize ? vectorize(input) : input

        readLines(positive_dataset_file).forEach( line => output.push({input: vectorizeIfNeeded(line), output: [1]}) )
        readLines(negative_dataset_file).forEach( line => output.push({input: vectorizeIfNeeded(line), output: [0]}) )
        
        const file_name = `${options.name}.json`

        fs.writeFileSync(file_name, JSON.stringify(output), 'utf8')

        console2.success(`Dataset file was successfully created.`)
                .log(`file: ${file_name}\n`)
    },

    /**
     * Train a model
     * 
     * @param {string} file
     * @param {object} options
     */   
    train: (file,options) => {

        const net = new brain.NeuralNetwork({
            activation: options.activation,
            hiddenLayers: [options.hiddenLayers],
            learningRate: options.learningRate
        })

        let training_dataset = JSON.parse(fs.readFileSync(file))

        // String vectorization support
        if (options.vectorize){
            training_dataset.map( dataset => {
                if (typeof dataset.input === 'string'){
                    dataset.input = vectorize(dataset.input)
                }
    
                return dataset
            })
        }

        // Randomization support
        if (options.randomize){
            for (let i = 0;i<20;i++){
                training_dataset = shuffle(training_dataset)
            }
        }

        fs.mkdirSync(options.name)

        const storeNet = file => {
            let vector_function = (options.vectorize) ? vectorize.toString() : 'function vectorize(i){ return i; }'
            
            let moduleExports = `function predict(input){ return anonymous(vectorize(input)); }
                                 if (typeof module === 'object'){ module.exports = predict; }`

            let code = `${net.toFunction().toString()}
                        ${vector_function}
                        ${moduleExports}`

            fs.writeFileSync(file,code,'utf8')
        }

        net.train(training_dataset,{
            errorThresh: options.errorThreshold,
            iterations: options.iterations,
            log: options.log,
            logPeriod: options.logPeriod,
            learningRate: options.learningRate,
            callback: netState => storeNet(`${options.name}/model-iterations-${netState.iterations}-error-${netState.error}.js`),
            callbackPeriod: options.savePeriod
        })

        storeNet(`${options.name}/model.js`)
    }

}

module.exports = DeepNet