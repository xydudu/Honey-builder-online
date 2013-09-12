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
        if (!configs.project_views) {
            res.render('setting', {})
        } else {
            res.end('Honey Builder Client //honey lab')
        }
    },
    '/setting': {
        'POST': function(req, res) {
            if (req.body) {
                
                filetree.saveConfigs(req.body, function(_err) {
                    res.end(_err ? '0' : '1')
                })  
            
            } else res.end('0')  
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
        .use(connect.bodyParser())
        .use(connect.static('../assert'))
        .use(router)
        //.listen(_port)

    return app.listen(_port)
}
