var exec = require('child_process').exec;
var should = require('should');
var center_server = require('../web/center/app').server;
var request = require('request');


describe("Center web interface", function () {
    var app;
    before(function() {
        app = center_server(3000);
    })
    after(function() {
        app.close();
    })
    describe("Http methods", function () {
        it("center hello world", function (done) {
            var url = 'http://localhost:3000/';
            request(url, function(_err, _res, _body) {
                should.not.exist(_err);
                _res.should.have.status(200);
                done()
            });
        });

        it("post compress command", function(done) {
            this.timeout(15000);
            var url = 'http://localhost:3000/compress';
            
            request.post({
                url: url,
                form: {
                    mods: 'lib:jquery, mod_login',
                    project_name: 'i.hunantv',
                    pub: 'http://honey.hunantv.com/honey-2.0/',
                    root: 'http://honey.hunantv.com/i/js/'
                }
            }, function(_err, _res, _body) {
                should.not.exist(_err);
                _res.should.have.status(200);
                _body.should.equal('1');
                done();
            });

        });
    });
});


