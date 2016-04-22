
var exec = require('child_process').exec;
var should = require('should');
var path = require('path');
var fs = require('fs');
var center_server = require('../web/center/app').server;


describe("命令", function () {
    var app;
    before(function() {
        app = center_server(3000);
    })
    after(function() {
        app.close();
    })
    it("honey.build(a.php) 函数", function (done) {
        this.timeout(30000);
        var test_file = path.resolve('./test/example/x/a.php');
        var honey = require('../index');
        honey.build(test_file, function(_err) {
            should.not.exist(_err); 
            fs.readFileSync(test_file, 'utf8').should.match(/i.hunantv#/);
            done();
        }); 
    });
});
