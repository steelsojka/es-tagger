es-tagger
======

Generate tags for modern Javascript using babel.

Install
-------

```shell
npm install -g es-tagger
```

Useage
------

### CLI

```
estagger --output tags "src/**/*.js"
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
var parser = require('es-tagger');

var tags = parser(__dirname + '/**/*.js', {
  silent: true
});

tags.join('\n');
```
