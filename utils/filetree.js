/*
 * Lian Hsueh
 * Get files tree from a directory -- Honey builer online  
 * from 9.4/2013 to ... endless
 *
 * */

'use strict'

var 
fs = require('fs'),
path = require('path')

function getTree(_path, _arr) {

    var 
    arr = _arr || [],
    tree = fs.readdirSync(_path)
        .filter(function(_file) {
            if (/^\./.test(_file)) return false
            if (/\.(js|png|jpeg|css|gif)$/.test(_file)) return false
            return true
        }) 
        .map(function(_file) {
            var _p = path.join(_path, _file)
            return {path: _p, name: _file}
        })
        .forEach(function(_file) {
            if (fs.statSync(_file.path).isDirectory()) {
                getTree(_file.path, arr)
            } else
                arr.push(_file)
        })

    return arr
}

function saveConfigs(_data, _callback) {
    var config = __dirname +'/../configs.json';
    fs.writeFile(config, JSON.stringify(_data), 'utf8', _callback) 
}

function fileState(_path) {
    var content = fs.readFileSync(_path, 'utf8')
    if (!/(honey|HN|H)\.go/.test(content)) return '-1'
    var result = /(honey|HN|H)\.go\(['|"](.+)#([\S\-]+)/.test(content)
    return result ? '1' : '0'
}

exports.getTree = getTree
exports.saveConfigs = saveConfigs
exports.fileState = fileState
