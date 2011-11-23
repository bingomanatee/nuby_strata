var Lang = require('strata_mvc/lang');

module.exports = function(root) {
    this.ROOT = root;
    this.lang = new Lang(this.default_lang, root + '/dict');
    this.app_path = root + '/apps';
}

module.exports.prototype = {
    root: '',
    MONGODB : {
        SERVER_NAME : 'localhost',
        DB_NAME:      'ac2',
        PORT:         27017
    },
    default_lang: 'us_en'
}