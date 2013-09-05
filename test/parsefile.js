

var parser = require('../utils/parsefile');
var path = require('path');
var should = require('should');
var fs = require('fs');


describe("取模块列表", function () {
    it("取到模块列表 --- 类型 1", function () {
        var test_file = path.resolve('./test/example/x/a.php');
        var except = [
            "lib:jquery",
            "mod:dialog",
            "mod_alert",
            "plugin_jvalidate",
            "mod_area",
            "mod_select",
            "mod_ymddate",
            "mod_setting"
        ];
        var mods = parser.getModules(test_file);
        mods.should.eql(except);
    });
    it("取到模块列表 --- 类型 2", function () {
        var test_file = path.resolve('./test/example/x/b.php');
        var except = [
            "lib:jquery",
            "plugin:pswencode",
            "mod:dialog",
            "mod_suggestion",
            "mod_login"
        ];
        var mods = parser.getModules(test_file);
        mods.should.eql(except);
    });
    it("取到模块列表 --- 类型 3", function () {
        var test_file = path.resolve('./test/example/y/index.php');
        var except = [
            "lib:jquery",
            "mod:dialog",
            "mod_alert",
            "mod_signature",
            "mod_zoom",
            "mod_photo",
            "mod_video",
            "mod_page",
            "mod_lazyload",
            "mod_slide",
            "mod_ad",
            "mod_change",
            "mod_share",
            "mod_gototop"
        ];
        var mods = parser.getModules(test_file);
        mods.should.eql(except);
    });
});

describe("取模块URL", function () {
    it("读honey配置，取模块路径", function() {
        var test_file = path.resolve('./test/example/y/index.php');
        var except = {
            pub: 'http://honey.hunantv.com/honey-2.0/',
            root: 'http://honey.hunantv.com/i/js/'
        };

        var config = parser.getConfigs(test_file);

        config.should.eql(except);
        
    });

    it("公共模块 -> 模块URL", function() {
        var root = 'http://honey.hunantv.com/honey-2.0/';
        var mod = 'lib:jquery';
        var except = {"name": "lib:jquery", "path": root +"lib/jquery.js"};
        //var mods = [
        //    "lib:jquery",
        //    "mod_login"
        //];
        //var except = [
        //    {"name": "lib:jquery", "path": config.pub +"lib/jquery.js"},
        //    {"name": "mod_login", "path": config.root +"mod/login.js"}
        //]

        var result = parser.modToUrl(mod);
        result.should.eql(except);
    })

    it("项目模块 -> 模块URL", function() {
        var root = 'http://honey.hunantv.com/i/js/';
        var mod = 'mod_login';
        var except = {"name": "mod_login", "path": root +"mod/login.js"};

        var result = parser.modToUrl(mod);
        result.should.eql(except);
    })
});
