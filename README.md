bson2json
=========

Converts BSON data to JSON

### Installation

    npm i bson2json -g

### Usage

    Usage: bson2json [options] [<file>]

    Converts BSON data to JSON

    Options:

      -h, --help     output usage information
      -V, --version  output the version number


**Examples**

    bson2json /tmp/bson_data.bson
    // {"foo":123,"bar":"xpto"}


    cat /tmp/bson_data.bson | bson2json