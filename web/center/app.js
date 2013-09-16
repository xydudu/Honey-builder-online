/*
 * Lian Hsueh
 * Center web interface -- Honey builer online  
 * from 9.10/2013 to ... endless
 *
 * */

'use strict'

var 
connect = require('connect'),
dispatch = require('dispatch'),
honey = require('../../index')

var router = dispatch({
    '/': function(req, res) {
        res.end('Honey Builder Center //honey lab')
    },
    '/compress': {
        'POST': function(req, res) {
            if (req.body) {
                honey.saveJS(req.body, function(_err) {
                    if (_err) {
                        console.error('save compressed js file fail')
                        res.end('0')
                    } else res.end('1')
                })

            
            } else res.end('0')
        },
        'GET': function(req, res) {
            res.end('Honey Builder Center // honey lab')
        }
    }
})

exports.server = function(_port) {
    var app = connect()
    app
        .use(connect.logger('dev'))
        .use(connect.bodyParser())
        .use(connect.static('../assets'))
        .use(router)
        //.listen(_port)

    return app.listen(_port)
}
