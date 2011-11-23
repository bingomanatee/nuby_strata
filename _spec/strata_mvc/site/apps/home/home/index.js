

exports = {

    handle: function(config, type) {
        var sm_home_handle = require('strata_mvc/home/handle');
        return sm_home_handle(config, type);
    },

    render: function(params) {
        return smr(__dirname + '/view.html', params);
    },

    info: function(){
        return {site: 'my site'};
    }

}