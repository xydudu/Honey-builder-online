/*
 * Lian Hsueh
 * Client web interface -- Honey builer online  
 * from 9.12/2013 to ... endless
 *
 * */

'use strict'

var 
connect = require('connect'),
dispatch = require('dispatch'),
connectJade = require('connect-jade'),
filetree = require('../../utils/filetree'),
honey = require('../../index'),

configs = require('../../configs.json')

var router = dispatch({
    '/': function(req, res) {
        if (!configs.project_view_path) {
            res.render('setting', {})
        } else {
            var filelist = filetree.getTree(configs.project_view_path)
            res.render('filelist', {
                filelist: filelist,
                path: configs.project_view_path
            })
        }
    },
    '/state': function(req, res) {
        if (!configs.project_view_path) {
            res.redirect('/')
        } else {
            var file_path = req.query.path
            if (!file_path) return res.end('0')
            var state = filetree.fileState(file_path)
            res.end(state ? '1' : '0')
        }
    },
    '/setting': {
        'POST': function(req, res) {
            var back = function (_msg) {
                return _msg +' <a href="/" > [ Back ] </a>'
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            if (req.body) {
                
                filetree.saveConfigs(req.body, function(_err) {
                    delete require.cache[require.resolve('../../configs.json')]

                    configs = require('../../configs.json')
                    res.end(back(_err ? 'Error' : 'Ok'))
                })  
            
            } else res.end(back('Error'))  
        },
        'GET': function(req, res) {
            res.end('Honey Builder Client //honey lab')
        } 
    }

})

exports.server = function(_port) {
    var app = connect()
    app
        .use(connect.logger('dev'))
        .use(connectJade({
            root: __dirname +"/../assert/views",
            debug: true,
            defaults: {
              title: "Honey Build Online System"
            }
        }))
        .use(connect.query())
        .use(connect.bodyParser())
        .use(connect.static('../assert'))
        .use(router)
        //.listen(_port)

    return app.listen(_port)
}
