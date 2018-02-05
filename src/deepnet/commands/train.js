'use strict'

const fs = require('fs')
const brain = require('brain.js')
const shuffle = require('../shuffle')
const console2 = require('../console2')
const vectorize = require('../vectorize')

class TrainCommand {

    /**
     * Initialize the training command
     * 
     * @param {string} file 
     * @param {object} options
     * 
     * @returns {void} 
     */
    constructor(file, options){

        this.options = options

        this.net = new brain.NeuralNetwork({
            activation: options.activation,
            hiddenLayers: [options.hiddenLayers],
            learningRate: options.learningRate
        })

        this.test_dataset = []
        this.training_dataset = JSON.parse(fs.readFileSync(file))
    }

    /**
     * Run the tranining process
     * 
     * @returns {void}
     */
    run(){

        if (this.options.vectorize) {
            this.vectorizeDatasets(this.training_dataset)
        }

        if (this.options.randomize) {
            for (let i = 0;i<20;i++){
                this.training_dataset = shuffle(this.training_dataset)
            }
        }

        if (this.options.testDatasetPercentage){
            let {train, test} = this.splitDataset(this.training_dataset, this.options.testDatasetPercentage)
            this.test_dataset = test
            this.training_dataset = train
        }

        if (!fs.existsSync(this.options.name)){
            fs.mkdirSync(this.options.name)
        }

        console2.bg('blue').log('[STARTING TRAINING SESSION]')

        this.net.train(this.training_dataset,{
            errorThresh: this.options.errorThreshold,
            iterations: this.options.iterations,
            log: this.options.log,
            logPeriod: this.options.logPeriod,
            learningRate: this.options.learningRate,
            callback: this.saveModel.bind(this),
            callbackPeriod: this.options.savePeriod
        })
        
        console2.bg('blue').log('[TRAINING SESSION COMPLETED]')

        this.saveModel({},true)

        if (this.test_dataset.length > 0){
            this.runAccuracyTests(this.net, this.test_dataset)
        }
    }

    /**
     * Store the current model
     * 
     * @param {object} state 
     * @param {boolean} isFinal
     * 
     * @returns {void}
     */
    saveModel(state, isFinal = false){
        if (typeof state.iterations !== 'undefined' && state.iterations === 0){
            return
        }

        let vector_function = (this.options.vectorize) ? vectorize.toString() : 'function vectorize(i){ return i; }'
            
        let moduleExports = `function predict(input){ return anonymous(vectorize(input)); }
                                if (typeof module === 'object'){ module.exports = predict; }`

        let code = `${this.net.toFunction().toString()}
                    ${vector_function}
                    ${moduleExports}`

        let path = isFinal ? `${this.options.name}/model.js` : `${this.options.name}/model-i-${state.iterations}-e-${state.error}.js`

        fs.writeFileSync(path,code,'utf8')

        console2.log(`Model successfully saved to "${path}"`)
    }

    /**
     * Split a given dataset based on a given percentage.
     * 
     * @param {array} dataset
     * @param {array} percentage 
     * 
     * @returns {object}
     */
    splitDataset(dataset, percentage){
        let size = Math.round(dataset.length*(percentage*0.01))
        
        let test = dataset.slice(0,size)
        let train = dataset.slice(size+1,dataset.length)

        return {train, test}
    }

    /**
     * Vectorize a given dataset
     * 
     * @param {array} datasets
     * 
     * @returns {array}
     */
    vectorizeDatasets(datasets){
        return datasets.map( dataset => {
            if (typeof dataset.input === 'string'){
                dataset.input = vectorize(dataset.input)
            }
        
            return dataset
        })
    }

    /**
     * Calculate the accuracy of a model for a given dataset.
     * 
     * @param {NeuralNetwork} model
     * @param {array} dataset
     * 
     * @returns {float}
     */
    runAccuracyTests(model, dataset){
        console2.bg('blue').log('[ACCURACY TESTS]')
                .log(`Running ${dataset.length} tests...`)

        let success = 0

        dataset.forEach( set => {
            let output = model.run(set.input)

            switch(set.output[0]){
                case 1:
                    if (output >= 0.8){
                        success++
                    }
                break;
                case 0:
                    if (output <= 0.5){
                        success++
                    }
                break;
            }
        })

        let accuracy = success / dataset.length

        let errors = dataset.length - success

        console2.success(`Success: ${success}`)
                .error(`Errors: ${errors}`)
                .log(`Model Accuracy: ${accuracy*100}%\n`)
        
        return accuracy
    }

}

module.exports = (file, options) => {
    const command = new TrainCommand(file, options)
    return command.run()
}