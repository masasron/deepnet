'use strict'

const DeepNet = require('./deepnet')
const commander = require('commander')

const parseBoolean = value => Boolean(value)

commander
  .version('0.0.1')

commander
  .command('train <file>')
  .option('-n, --name <value>', 'choose a name for your model',`model-${new Date().getTime()}`)
  .option('-s, --save-period <n>', 'save model every <n> iterations', parseInt, 99999999)
  .option('-v, --vectorize <f>','automatically vectorize strings from training data',parseBoolean, true)
  .option('-l, --learning-rate <f>','network learning rate',parseFloat, 0.1)
  .option('-e, --error-threshold <f>', 'minimum error threshold', parseFloat, 0.005)
  .option('-H, --hidden-layers <n>','number of hidden layers', parseInt, 8)
  .option('-i, --iterations <n>','maximum number of iterations', parseInt, 20000)
  .option('-p, --log-period <n>','log progress every <n> iterations', parseInt, 100)
  .option('-L, --log <b>','log traning progress', parseBoolean, true)
  .option('-r, --randomize <b>','randomize dataset', parseBoolean, true)
  .option('-a, --activation <activation>','activation function',/^(sigmoid|relu|leaky-relu|tanh)$/i,'sigmoid')
  .action(DeepNet.train)

commander
  .command('dataset <positive_dataset_file> <negative_dataset_file>')
  .option('-n, --name <f>','choose a dataset name', `dataset-${new Date().getTime()}`)
  .option('-v, --vectorize <f>','automatically vectorize strings',parseBoolean, true)
  .action(DeepNet.dataset)

commander
  .command('predict <model> <test-data>')
  .option('<model>','path to the model .bin file')
  .option('<test-data>','test data as string (if -, read from stdin)')
  .action(DeepNet.predict)

commander.parse(process.argv)