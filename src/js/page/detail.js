require(['jquery', 'render'], function($, render) {
    var ids = location.search.slice(1).split('=')[1];
    $.ajax({
        url: '/api/detail',
        type: 'post',
        data: {
            id: ids
        },
        dataType: 'json',
        success: function(res) {
            render('#tpla', res.data, '#wrapper')
        }
    })
})