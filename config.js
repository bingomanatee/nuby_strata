var nuby_strata = require('nuby-strata');
var static = nuby_strata.loader.static;
var util = require('util');

module.exports = {
    create:function (root) {
        var config = nuby_strata.config.create({ROOT:root, port:3000});

       // console.log('config create: loader = %s', util.inspect(nuby_strata.loader, true, 0));

        var public_resource = {root:  root + '/public', index: ['index.html', 'index.htm']};

        config.MONGODB.DB_NAME = 'arena_colles_3';
        config.layout_root = root + '/layouts';
        config.lang = nuby_strata.lang.create(root + '/dict', config.default_lang);
        config.static_resources.push(public_resource);
        config.session = {
            secret: 'mars is h0ll0w',
            name: 'ac_session'
        };
        return config;
    }

}