
var exec = require('child_process').exec;
var should = require('should');
var path = require('path');
var fs = require('fs');

describe("命令", function () {
    it("honey.build(a.php) 函数", function (done) {
        this.timeout(30000);
        var test_file = path.resolve('./test/parsed/a.php');
        var honey = require('../');
        honey.build(test_file, function(_err) {
            should.not.exist(_err); 
            fs.readFileSync(test_file, 'utf8').should.match(/i.hunantv#/);
            done();
        }); 
    });
});
