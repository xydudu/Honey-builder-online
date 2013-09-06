/*
 * Lian Hsueh
 * Package -- Honey builer online  
 * from 9.6/2013 to ... endless
 *
 * */

'use strict'

var request = require('request')
var fs = require('fs')
var path = require('path')
var _s = require('underscore.string')
var q = require('q')
var async = require('async')

function concatMods(_mods) {
    var 
    deferred = q.defer(),
    getSource = function(_mod, _callback) {
        request(_mod.path, function(_err, _res, _body) {
            //if (/jquery/.test(_mod.path))
            //    _body = '';
            _callback(_err, _body) 
        })
    } 

    async.map(_mods, getSource, function(_err, _results){
        _results = _results.join(';')
        deferred.resolve(_results) 
    })

    return deferred.promise
}

exports.concatMods = concatMods
