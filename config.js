var nuby_strata = require('nuby-strata');

module.exports = {
    create:function (root) {
        var config = nuby_strata.config.create({ROOT:root, port:3000});
        config.MONGODB.DB_NAME = 'arena_colles_3';
        config.lang = nuby_strata.lang.create(root + '/dict', config.default_lang);
        return config;
    }

}