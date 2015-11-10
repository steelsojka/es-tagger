estags
======

Generate tags for modern Javascript using babel.

Install
-------

```shell
npm install -g estags
```

Useage
------

### CLI

```
estags --file tags "src/**/*.js"
```

#### Options

```
estags [OPTIONS] [FILES]

Options:
  --help              Show help                                        [boolean]
  --file, -f          File to output to                                 [string]
  --silent, -s        Silent parse errors             [boolean] [default: false]
  --header, -h        Whether to include the header with stdout
                                                      [boolean] [default: false]
  --sourceType, --st  Babylon parsing file source type
                      [string] [choices: "script", "module"] [default: "module"]
  --plugins, -p       Babel plugins to enable while parsing
       [array] [choices: "*", "decorators", "asyncFunctions", "asyncGenerators",
                                        "exponentiationOperator"] [default: "*"]
```

### API

```
var parser = require('estags');

var tags = parser(__dirname + '/**/*.js');

tags.join('\n');
```
