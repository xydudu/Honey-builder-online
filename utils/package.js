/*
 * Lian Hsueh
 * Package -- Honey builer online  
 * from 9.6/2013 to ... endless
 *
 * */

'use strict'

var request = require('request')
var q = require('q')
var async = require('async')
var UglifyJS = require("uglify-js")

function concatMods(_mods) {
    var 
    deferred = q.defer(),
    getSource = function(_mod, _callback) {
        request(_mod.path, function(_err, _res, _body) {
            //if (/jquery/.test(_mod.path))
            //    _body = '';
            var result = UglifyJS.minify(_body, {
                fromString: true
            })
            _callback(_err, result.code) 
        })
    } 

    async.map(_mods, getSource, function(_err, _results){
        _results = _results.join(';')
        deferred.resolve(_results) 
    })

    return deferred.promise
}

exports.concatMods = concatMods
