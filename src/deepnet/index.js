'use strict'

const fs = require('fs')

const shuffle = require('./shuffle')
const console2 = require('./console2')
const vectorize = require('./vectorize')

const TrainCommand = require('./commands/train')
const PredictCommand = require('./commands/predict')
const DatasetCommand = require('./commands/dataset')

const DeepNet = {
    train: TrainCommand,
    predict: PredictCommand,
    dataset: DatasetCommand
}

module.exports = DeepNet