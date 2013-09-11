/*
 * Lian Hsueh
 * commands here -- Honey builer online  
 * from 9.10/2013 to ... endless
 *
 * */

'use strict'

var 
q = require('q'),
_ = require('underscore'),
_s = require('underscore.string'),
path = require('path'),
async = require('async'),
request = require('request'),

parser = require('../utils/parsefile'),
packer = require('../utils/package'),
tree = require('../utils/filetree'),
global_config = require('../configs.json')


function getPath(_sources) {
    var js_path = global_config.js_path || path.resolve('./test/parsed/')
    return [js_path +'/'+ _sources.project_name +'/', _sources]
}


function msgToCenter(_config, _mods, _callback) {
    var center_server = global_config.center || 'http://localhost:3000'
    request.post({
        url: center_server +'/compress',
        form: {
            mods: _mods.join(','),
            project_name: _config.project_name,
            pub: _config.pub,
            root: _config.root
        }
    }, function(_err, _res, _body) {
        _callback(_err, _body)
    });    
}

function encodeFile(_file, _mod_name, _callback) {
    parser.encodeFile(_file, _mod_name, _callback)
}

function build(_file, _options, _callback) {
    
    if (arguments.length === 1) {
        _callback = function() {}
        _options = {}
    }

    if (_.isFunction(_options)) {
        _callback = _options
        _options = {}
    } 
    
    parser.getConfigs(_file).then(function(_config) {
        
        var 
        mod_names = parser.getModules(_file),
        concat_mod_name = _config.project_name +'#'+ mod_names.join('-')

        if (!mod_names.length) {
            _callback(null)
            return 
        }

        async.parallel([
            async.apply(msgToCenter, _config, mod_names),
            async.apply(encodeFile, _file, concat_mod_name)
        ], _callback);

    })

}

function saveJS(_options, _callback) { 
    var 
    mods = _options.mods.split(','),
    config = _options,
    mod_list = []

    while (mods.length) {
        var mod = _s.trim(mods.shift())
        mod_list.push(parser.modToUrl(mod, config))
    }
    packer.concatMods(mod_list)
        .then(function(_sources) {
            _sources.project_name = config.project_name
            return _sources
        })
        .then(getPath)
        .spread(packer.writeFile)
        .then(_callback)
}

exports.build = build
exports.saveJS = saveJS

//var test_file = require('path').resolve('./test/parsed/a.php');
//build(test_file, function() {
//    console.log('---')
//})
