
var pack = require('../utils/package');
var path = require('path');
var should = require('should');

describe("合并模块", function () {
    it("模块列表 -> 取模块文件内容", function (done) {
        this.timeout(5000);
        var pub = 'http://honey.hunantv.com/honey-2.0/';
        var root = 'http://honey.hunantv.com/i/js/';
        var mods = [
            {"name": "lib:jquery", "path": pub +"lib/jquery.js"},
            {"name": "mod:login", "path": root +"mod/login.js"}
        ];
        pack.concatMods(mods).then(function (_sources) {
            _sources.should.match(/checkaccount/);
            done();
        });
    });
});
