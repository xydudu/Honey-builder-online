/*
 * Lian Hsueh
 * Parser -- Honey builer online  
 * from 9.5/2013 to ... endless
 *
 * */

'use strict'

var request = require('request')
var fs = require('fs')
var path = require('path')
var _s = require('underscore.string')
var q = require('q')

function getModules(_file) {
    var 
    content = fs.readFileSync(_file, 'utf8'),
    regexp = /[honey|HN]\.go\(["|'](.+?)["|'],.*?function/gi

    content = content.replace(/["|'](\s+)?\+(\s+)?["|']/gi, '')
    
    //var result = content.match(regexp)
    var result = regexp.test(content)
    //var result = content.replace(regexp, '') 

    //console.log(result)
    //console.log(RegExp.$1)
    if (result) {
        result = RegExp.$1.split(',').map(function(_item) {
            return _s.trim(_item)
        })
    } else result = []

    return result
}

function modToUrl(_mod, _config) {
    var 
    type = _mod.indexOf(':') > 0 ? 'pub' : 'root',
    root = _config[type]

    return {
        name: _mod,
        path: root + _mod.split(/[:|_]/).join('/') +'.js'
    }
}

function getConfigs(_file) {
    //http://honey.hunantv.com/honey-2.0/honey.ihunantv.js
    
    var 
    deferred = q.defer(),
    content = fs.readFileSync(_file, 'utf8'),
    regexp = /honey\-2\.0\/honey\.(\S+?)\.js/gi,
    result = regexp.test(content)

    if (!result) throw new Error('找不到配置文件')
    
    var honey_source = RegExp.$1
    honey_source = 'http://honey.hunantv.com/honey-2.0/honey.'+ honey_source +'.js'
    
    request(honey_source, function (error, response, _body) {
        if (!error && response.statusCode == 200) {
            /ROOT="(.+?)".*PUBROOT="(.+?)"/gi.test(_body)
            //_callback({root: RegExp.$1, pub: RegExp.$2})
            //deferred.resolve({root: RegExp.$1, pub: RegExp.$2})
            deferred.resolve({root: RegExp.$1, pub: RegExp.$2})
        } else {
            throw new Error('找不到配置文件')   
        }
    })
    return deferred.promise
}

exports.getModules = getModules
exports.modToUrl = modToUrl
exports.getConfigs = getConfigs
//
//var test_file = path.resolve('./test/example/x/a.php')
//var mods = getConfigs(test_file).then(function(v) {
//    //console.log(v)
//    return v
//})

//console.log(mods)
//setTimeout(function() {
//    console.log(mods)
//}, 1000)
//setTimeout(function() {
//    console.log(mods)
//}, 2000)
