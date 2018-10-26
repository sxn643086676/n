require(['jquery', 'render'], function($, render) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            render('#tpls', res.data, '.wrapper')
        }
    })


})