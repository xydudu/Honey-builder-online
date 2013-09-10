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
parser = require('../utils/parsefile'),
packer = require('../utils/package'),
tree = require('../utils/filetree')


function concatMods(_config) {
    var mods = getModList(_config)
    return [_config, packer.concatMods(mods)]
}

function getModList(_config) {
    var 
    mods = parser.getModules(_config.file),
    mod_list = [] 
    while(mods.length) {
        var mod = mods.shift()
        mod_list.push(parser.modToUrl(mod, _config))
    }
    return mod_list
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

exports.build = build

//var test_file = require('path').resolve('./test/parsed/a.php');
//build(test_file)
