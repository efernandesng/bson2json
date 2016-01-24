#!/usr/bin/env node
'use strict';

const program = require('commander');
const fs = require('fs');
const bson = require('bson');
const pkg = require('./package.json');

program
    .version(pkg.version)
    .description(pkg.description)
    .usage('[options] [<file>]')
    .parse(process.argv);

const stdin = process.stdin;
const BSON = new bson.BSONPure.BSON();

function deserialize(data) {
    try {
        let obj = BSON.deserialize(data);
        process.stdout.write(JSON.stringify(obj) + '\n')
    } catch (err) {
        process.stderr.write('Corrupt BSON data!\n');
    }
}

if (program.args[0]) {
    fs.readFile(program.args[0], (err, data)=> {
        if (err) {
            return process.stderr.write(err.message + '\n');
        }

        deserialize(data);
    })
} else {
    let buf = new Buffer(0);
    stdin.on('readable', ()=> {
        let chunk = stdin.read();
        // Check if has something on pipe
        if (chunk === null) {
            if (buf.length === 0) {
                stdin.removeAllListeners('readable');
                // Nothing to do! Print help
                program.help()
            } else {
                // Last null chunk
                deserialize(buf)
            }
        } else {
            let cBuf = new Buffer(chunk, 'binary');
            buf = Buffer.concat([buf, cBuf], buf.length + cBuf.length);
        }
    });
}