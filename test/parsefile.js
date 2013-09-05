

var parser = require('../utils/parsefile');
var path = require('path');
var should = require('should');
var fs = require('fs');


describe("文件分析", function () {
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
