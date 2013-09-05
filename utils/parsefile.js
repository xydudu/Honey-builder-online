/*
 * Lian Hsueh
 * Parser -- Honey builer online  
 * from 9.5/2013 to ... endless
 *
 * */

'use strict'

var fs = require('fs')
var path = require('path')
var _s = require('underscore.string')

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

function modToUrl(_mod) {
    
    return {}
}

function getConfigs(_file) {
    
    return {}
}

exports.getModules = getModules
exports.modToUrl = modToUrl
exports.getConfigs = getConfigs
//var test_file = path.resolve('./test/example/x/a.php')
//var mods = getModules(test_file)
//console.log(mods)
