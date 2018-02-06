'use strict'

const fs = require('fs')

const shuffle = require('./shuffle')
const console2 = require('./console2')
const vectorize = require('./vectorize')

const TrainCommand = require('./commands/train')
const PredictCommand = require('./commands/predict')
const MakeDatasetCommand = require('./commands/make-dataset')

const DeepNet = {
    train: TrainCommand,
    predict: PredictCommand,
    makeDataset: MakeDatasetCommand
}

module.exports = DeepNet