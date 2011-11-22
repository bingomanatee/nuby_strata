var smr = require('strata_mvc/render');
var util = require('util');

module.exports = {

    handle: function(config, type) {
        var sm_default_handle = require('strata_mvc/loader/default/default');
        return sm_default_handle.handle(config, type);
    },

    render: function(params) {
        console.log('rendering params', util.inspect(params));
        return smr(__dirname + '/view.html', params);
    },

    data: function(){
        return {foo: 1};
    }

}