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
            var cp =fs.createReadStream(config_path).pipe(fs.createWriteStream(config_bak_path));
            cp.on('close', function() {
                fs.writeFile(config_path, "{}", 'utf8', done);
            });
        });

        after(function(done) {
            var cp = fs.createReadStream(config_bak_path).pipe(fs.createWriteStream(config_path));
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
                _body.should.match(/Ok/);
                fs.readFileSync(__dirname +'/../configs.json').should.match(/project_view_path/);
                done()
            });
        });
       
    });


    describe("Setting is ready", function() {

        before(function(done) {

            this.timeout(25000);

            //app.close();
            delete require.cache[require.resolve('../configs.json')]
            //delete require.cache[require.resolve('../web/client/app')]

            var project_view_path = __dirname +'/example/';
            var cp =fs.createReadStream(config_path).pipe(fs.createWriteStream(config_bak_path));
            cp.on('close', function() {
                
                fs.writeFile(
                    config_path, 
                    '{"project_view_path": "'+ project_view_path +'"}',
                    'utf8', done);
            });
        });

        after(function(done) {
            var cp = fs.createReadStream(config_bak_path).pipe(fs.createWriteStream(config_path));
            cp.on('close', function() {
                fs.unlink(config_bak_path, done);
            });
        });

        it("should list files", function (done) {
            //app = require('../web/client/app').server(3001);
            request(url, function(_err, _res, _body) {
                _body.should.match(/a.php/);
                _body.should.match(/b.php/);
                done();
            });
        });

        it("should say file not parsed", function (done) {
            //app = require('../web/client/app').server(3001);
            var test_file = path.resolve('./test/example/x/a.php');
            var api = url +'state?path='+ test_file
            request(api, function(_err, _res, _body) {
                console.log(_body)
                should.not.exist(_err);
                _body.should.equal('0');
                done();
            });
        });

        it("should say file was parsed already", function (done) {

            var test_file = path.resolve('./test/example/x/parsed.php');
            var api = url +'state?path='+ test_file;

            request(api, function(_err, _res, _body) {
                console.log(_body)
                should.not.exist(_err);
                _body.should.equal('1');
                done();
            });
        });



        describe("parse file api", function(done) {
            var test_file = path.resolve('./test/example/x/b.php');
            var test_file_bak = path.resolve('./test/example/x/_b.php');
            var center_app;
            before(function(done) {
             
                center_app = center_server(3000);
                var cp =fs.createReadStream(test_file).pipe(fs.createWriteStream(test_file_bak));
                cp.on('close', done);

            });
            after(function(done) {

                center_app.close();
                var cp =fs.createReadStream(test_file_bak).pipe(fs.createWriteStream(test_file));
                cp.on('close', function() {
                    fs.unlink(test_file_bak, done);
                });

            });

            it("file should be parsed", function(done) {
                this.timeout(25000);
                var api = url +'parse'
                request.post({
                    url: api,
                    form: {
                        path: test_file
                    }
                }, function(_err, _res, _body) {
                    should.not.exist(_err);
                    _res.should.have.status(200);
                    fs.readFileSync(test_file, 'utf8').should.match(/i.hunantv#/);
                    _body.should.equal('1');
                    done();
                });
            });

        });
    
    });
 

});
