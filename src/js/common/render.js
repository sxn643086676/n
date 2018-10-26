define(['jquery', 'handlebars'], function($, handlebars) {
    var render = function(tpl, data, target) {
        var tpl = $(tpl).html();
        var template = handlebars.compile(tpl);
        var html = template(data);
        $(target).html(html);
    }
    return render;
})