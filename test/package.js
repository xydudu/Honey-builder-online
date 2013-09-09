
var pack = require('../utils/package');
var path = require('path');
var should = require('should');
var fs = require('fs');

describe("合并模块", function () {
    it("模块列表 -> 取模块文件内容", function (done) {
        this.timeout(15000);
        var pub = 'http://honey.hunantv.com/honey-2.0/';
        var root = 'http://honey.hunantv.com/i/js/';
        var mods = [
            {"name": "lib:jquery", "path": pub +"lib/jquery.js"},
            {"name": "mod_login", "path": root +"mod/login.js"}
        ];
        pack.concatMods(mods).then(function (_sources) {
            console.log(_sources.name)
            console.log(_sources.source.length)
            _sources.name.should.equal('lib:jquery-mod_login');
            _sources.source.should.match(/checkaccount/);
            done();
        });
    });

    it('合并压缩模块到一个文件中', function(done) {
        this.timeout(25000);

        var source = {name: 'lib:jquery-mod:login', source: 'var a=1;console.log(a);'};
        var build_path = path.resolve('./test/example/');
        var file = pack.writeFile(build_path, source)
            .then(function(err) {
                should.not.exist(err); 
                fs.existsSync('./test/example/'+ source.name +'.js').should.be.true;
                done();
            });
        
    });
});
