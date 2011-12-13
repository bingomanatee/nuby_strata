var nuby_strata = require('nuby-strata');
var static = nuby_strata.loader.static;

module.exports = {
    create:function (root) {
        var config = nuby_strata.config.create({ROOT:root, port:3000});

        var public_resources = static.create('/', root + '/public', ['index.html', 'index.htm']);

        config.MONGODB.DB_NAME = 'arena_colles_3';
        config.layout_root = root + '/layouts';
        config.lang = nuby_strata.lang.create(root + '/dict', config.default_lang);
        config.static_resources.push(public_resources);
        return config;
    }

}