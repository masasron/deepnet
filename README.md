# DeepNet
DeepNet is simple node based cli tool for creating machine learning classifiers you can use on the web.

```bash
root$ node deepnet/src/cli.js -h

Usage: cli [options] [command]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    train [options] <file>
    make-dataset [options] <positive_dataset_file> <negative_dataset_file>
    predict [options] <model> <test-data>
```

### Train

```bash
root$ node deepnet/src/cli.js train -h

  Usage: train [options] <file>



  Options:

    -t, --test-dataset-percentage <n>  percentage of datasets to keep for testing (default: 25)
    -n, --name <value>                 choose a name for your model (default: model-1518027472621)
    -s, --save-period <n>              save model every <n> iterations (default: 20000)
    -v, --vectorize <f>                automatically vectorize strings from training data (default: true)
    -l, --learning-rate <f>            network learning rate (default: 0.1)
    -e, --error-threshold <f>          minimum error threshold (default: 0.005)
    -y, --hidden-layers <n>            number of hidden layers (default: 6)
    -i, --iterations <n>               maximum number of iterations (default: 20000)
    -p, --log-period <n>               log progress every <n> iterations (default: 25)
    -g, --log <b>                      log traning progress (default: true)
    -r, --randomize <b>                randomize dataset (default: true)
    -a, --activation <activation>      activation function (default: sigmoid)
    -h, --help                         output usage information
```

The train command require a JSON dataset file in the format below.   
You may use the `make-dataset` helper command to generate this file.

```json
[
  {
    "input": [0.1,0.2,0.3],
    "output": [0.6]
  },
  {
    "input": [0.1,0,0],
    "output": [0.1]
  }
]
```

### Make Dataset

```sh
root$ node deepnet/src/cli.js make-dataset -h

  Usage: make-dataset [options] <positive_dataset_file> <negative_dataset_file>


  Options:

    -n, --name <f>       choose a dataset name (default: dataset-1518028193094)
    -v, --vectorize <f>  automatically vectorize strings (default: true)
    -h, --help           output usage information
```

### Predict

You can use the predict command to load an existing model.

```sh
root$ node deepnetsrc/cli.js predict -h

  Usage: predict [options] <model> <test-data>


  Options:

    <model>      path to the model .bin file
    <test-data>  test data as string (if -, read from stdin)
    -h, --help   output usage information
```
