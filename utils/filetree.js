'use strict'


// for test
//var  project_path = '/Users/linlei/www/ihunantv.dev1.2/application/views'


var 
fs = require('fs'),
path = require('path')

function getTree(_path, _arr) {

    var 
    arr = _arr || [],
    tree = fs.readdirSync(_path)
        .filter(function(_file) {
            if (/^\./.test(_file)) return false
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

exports.getTree = getTree

// for test
//var x = getTree(project_path)
//console.log(x)



