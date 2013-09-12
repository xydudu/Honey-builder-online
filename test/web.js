var exec = require('child_process').exec;
var should = require('should');
var center_server = require('../web/center/app').server;
var client_server = require('../web/client/app').server;
var request = require('request');
var path = require('path');
var fs = require('fs');



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

describe("Client web interface", function () {
    var app;
    var url = 'http://localhost:3001/';
    var config_path = path.resolve('./configs.json');
    var config_bak_path = path.resolve('./_configs.json');

    before(function() {
        app = client_server(3001);

    })
    after(function() {
        app.close();
    })
    describe("Http methods", function () {
        it("client hello world", function (done) {
            request(url, function(_err, _res, _body) {
                should.not.exist(_err);
                _res.should.have.status(200);
                done();
            });
        });
    });
        
    describe("No configs", function() {

        before(function(done) {
            // backend configs.json
            //var cp = fs.createWriteStream(config_bak_path);
            var cp =fs.createReadStream(config_path).pipe(fs.createWriteStream(config_bak_path));

            //cp.on('finish', function() {
            //    fs.writeFile(config_path, "{}", 'utf8', done);
            //});
            
            cp.on('close', function() {
                fs.writeFile(config_path, "{}", 'utf8', done);
            });
        });

        after(function(done) {
            //var cp = fs.createWriteStream(config_path);
            var cp = fs.createReadStream(config_bak_path).pipe(fs.createWriteStream(config_path));
            //cp.on('finish', function() {
            //    fs.unlink(config_bak_path, done);
            //});
            cp.on('close', function() {
                fs.unlink(config_bak_path, done);
            });
        });
    
        it("should redirect to setting page", function (done) {
            request(url, function(_err, _res, _body) {
                _body.should.match(/setting/);
                done();
            });
        });
        it("save settings to configs.json", function (done) {
            var project_view_path = __dirname +'/example/';
            request.post({
                url: url +'setting',
                form: {
                    project_view_path: project_view_path
                }
            }, function(_err, _res, _body) {
                should.not.exist(_err);
                _body.should.equal('1');
                fs.readFileSync(__dirname +'/../configs.json').should.match(/project_view_path/);
                done()
            });

        });
       
    });


});
