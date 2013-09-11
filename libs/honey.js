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
parser = require('../utils/parsefile'),
packer = require('../utils/package'),
tree = require('../utils/filetree'),
global_config = require('../configs.json')


function getPath(_sources) {
    var js_path = global_config.js_path || path.resolve('./test/parsed/')
    return [js_path +'/'+ _sources.project_name +'/', _sources]
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
        // message to Honey build center
        // broadcastToCenter
        parser.encodeFile(_file, concat_mod_name, function(_err) {
            if (!_err) {
                console.log('page is updated with a concated module')
            }
            _callback(_err)
        })

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
//build(test_file)
