/*
 * Lian Hsueh
 * Package -- Honey builer online  
 * from 9.6/2013 to ... endless
 *
 * */

'use strict'

var request = require('request')
var q = require('q')
var fs = require('fs');
var async = require('async')
var UglifyJS = require("uglify-js")
var _ = require('underscore')

function concatMods(_mods) {
    var 
    deferred = q.defer(),
    getSource = function(_mod, _callback) {
        request(_mod.path, function(_err, _res, _body) {
            var result = UglifyJS.minify(_body, {
                fromString: true
            })
            _callback(_err, {name: _mod.name, code: result.code}) 
        })
    } 

    async.map(_mods, getSource, function(_err, _results){
        var names = [], sources = []
        while(_results.length) {
            var mod = _results.shift()
            names.push(mod.name)
            sources.push(mod.code)
        }
        deferred.resolve({name: names.join('-'), source: sources.join(';')}) 
    })

    return deferred.promise
}

function writeFile(_path, _source) {
    var 
    deferred = q.defer(),
    filename = _path +'/'+ _source.name +'.js'

    fs.writeFile(filename, _source.source, 'utf-8', deferred.resolve) 
    return deferred.promise
}

exports.concatMods = concatMods
exports.writeFile = writeFile
