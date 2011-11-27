var nuby_strata = require('nuby-strata');

module.exports = {
    create:function (root, port) {
        var config = new nuby_strata.config.create(root, port, 'arena_colles_3');
        config.lang = new nuby_strata.lang(config.default_lang, root + '/dict');
        return config;
    }

}