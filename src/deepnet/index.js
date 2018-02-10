'use strict'

const TrainCommand = require('./commands/train')
const PredictCommand = require('./commands/predict')
const MakeDatasetCommand = require('./commands/make-dataset')

const DeepNet = {
    train: TrainCommand,
    predict: PredictCommand,
    makeDataset: MakeDatasetCommand
}

module.exports = DeepNet
