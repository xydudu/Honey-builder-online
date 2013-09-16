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
var _ = require('underscore')
var _s = require('underscore.string')
var q = require('q')

function getModules(_file) {
    var 
    content = fs.readFileSync(_file, 'utf8'),
    regexp = /\b(?:honey|HN)\.go\(["|'](.+?)["|'],.*?function/gi,
    result = []

    content = content.replace(/["|'](\s+)?\+(\s+)?["|']/gi, '')

    while(regexp.test(content)) {
        if (RegExp.$1.indexOf('#') > 0) return result
        result = result.concat(RegExp.$1.split(',').map(function(_item) {
            return _s.trim(_item)
        }))
        content = content.replace(RegExp.$1, '')
    }

    return _.uniq(result)
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

function getConfigs(_file, _callback) {
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

            if (/PROJECT="(.+?)".*ROOT="(.+?)".*PUBROOT="(.+?)"/gi.test(_body))
                deferred.resolve({
                    project_name: RegExp.$1,
                    root: RegExp.$2, 
                    pub: RegExp.$3,
                    file: _file
                })
            else throw new Error('找不到配置文件')
        } else {
            throw new Error('找不到配置文件')
        }
    })
    return deferred.promise
}

function encodeFile(_input, _name, _output, _callback) {
    if (_.isFunction(_output)) {
        _callback = _output
        _output = _input
    }
    
    var 
    content = fs.readFileSync(_input, 'utf8'),
    //regexp = /(.+\b(?:honey|HN)\.go\(["|'])(.+?)(["|'],.*?function.+)/gi
    regexp = /\b(?:honey|HN)\.go\(["|'](.+?)["|'],.*?function/gi
    //regexp = /(?:honey|HN|H)\.go/gi

    content = content.replace(/["|'](\s+)?\+(\s+)?["|']/gi, '')
    //content = content.replace(regexp, "$1"+ _name +"$3")


    content = content.replace(regexp, function($1, $2) {
        return 'honey.go("'+ _name +'"), function'
    })
    
    fs.writeFile(_output, content, 'utf8', _callback) 
    
}

function decodeFile(_file, _callback) {
    
    var
    content = fs.readFileSync(_file, 'utf8'),
    regexp = /['|"]((.+)#([a-z]+[\:|\_].+\-?))["']/gi

    content = content.replace(regexp, function($1, $2) {

        return '"'+ $2.split('#')[1].split('-').join(',') +'"'
    })

    fs.writeFile(_file, content, 'utf8', _callback) 

}

exports.getModules = getModules
exports.modToUrl = modToUrl
exports.getConfigs = getConfigs
exports.encodeFile = encodeFile
exports.decodeFile = decodeFile
