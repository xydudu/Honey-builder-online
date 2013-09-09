var tree = require('../utils/filetree').getTree;
var should = require('should');
var path = require('path');

describe("file tree", function () {
    it("取到文件列表", function () {
        var file_arr = tree(path.resolve('./test/example/'));
        var except = [
            {path: path.resolve('./test/example/x/a.php'), name: 'a.php'},  
            {path: path.resolve('./test/example/x/b.php'), name: 'b.php'},  
            {path: path.resolve('./test/example/y/index.php'), name: 'index.php'},
            {path: path.resolve('./test/example/y/more-go.php'), name: 'more-go.php'}
        ];
        file_arr.should.eql(except);
    });
});
