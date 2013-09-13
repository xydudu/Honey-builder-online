
var tree = require('../utils/filetree')
var should = require('should');
var path = require('path');

describe("file tree", function () {
    it("取到文件列表", function () {
        var file_arr = tree.getTree(path.resolve('./test/example/'));
        var except = [
            {path: path.resolve('./test/example/x/a.php'), name: 'a.php'},  
            {path: path.resolve('./test/example/x/b.php'), name: 'b.php'},  
            {path: path.resolve('./test/example/y/index.php'), name: 'index.php'},
            {path: path.resolve('./test/example/y/more-go.php'), name: 'more-go.php'},
            {path: path.resolve('./test/example/y/three-go.php'), name: 'three-go.php'}
        ];
        file_arr.should.includeEql(except[0]);
        file_arr.should.includeEql(except[1]);
        file_arr.should.includeEql(except[2]);
        file_arr.should.includeEql(except[3]);
        file_arr.should.includeEql(except[4]);
    });
});

describe("file state", function () {
    it("判断文件是否已处理", function () {
        var no_parsed = path.resolve('./test/example/x/a.php');
        var parsed = path.resolve('./test/example/x/parsed.php');
        tree.fileState(no_parsed).should.be.false
        tree.fileState(parsed).should.be.true
    });
});
