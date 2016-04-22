honey.go('lib:jquery,lib:mustache', function() {

    function getState(_file, _callback) {
        var api = '/state?path='+ _file.path;
        $.get(api, function(_data) {
            _callback(_data, _file)
        })
    }

    var 
    box = $('#list'),
    tpl = box.html(),
    new_list = [];

    box.empty().show();

    while(filelist.length) {
        var file = filelist.shift();
        getState(file, function(_data, _file) {
            if (_data < 0) return;
            _file.isparsed = ~~_data;
            _file.showindex = new_list.length;
            new_list.push(_file);
            box.append(Mustache.render(tpl, _file));
        });
    }


    box.on('click', '#parse', function(event) {
        event.preventDefault();
        var 
        i = this.className.split('-')[1],
        file = new_list[i]

        $.post('/parse', {path: file.path}, function(_res) {
            if (+_res) {
                alert('完成');
                $('#file-'+ i).remove();
            } else alert('Error');
        });
    });

    box.on('click', '#restore', function(event) {
        event.preventDefault();
        var 
        i = this.className.split('-')[1],
        file = new_list[i]

        $.post('/restore', {path: file.path}, function(_res) {
            if (+_res) {
                alert('完成');
                $('#file-'+ i).remove();
            } else alert('Error');
        });
    });


})



