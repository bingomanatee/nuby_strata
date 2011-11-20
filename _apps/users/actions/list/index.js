var rest_list = require('strata_mvc/REST/all');
var smr = require('strata_mvc/render');

exports = {

    handle: function(config, type) {
        return rest_list.handle(config, type);
    },

    query: function(params) {
        return {};
    },

    render: function(items, params) {
        params[items] = items;
        return smr(__dirname + '/view.html', params);
    }

}