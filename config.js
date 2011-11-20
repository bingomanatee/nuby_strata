var lang = require('strata_mvc/lang');

module.exports = {
    root: '',
    MONGODB : {
        SERVER_NAME : 'localhost',
        DB_NAME:      'ac2',
        PORT:         27017
    },
    lang: 'us_en',
    init: function(root) {
        module.exports.ROOT = root;
        lang.set_dict(root + '/dict');
    }
}

/*
 global.MVC_ROOT         = __dirname;
 global.MVC_PUBLIC       = MVC_ROOT + '/public';
 global.MVC_VIEWS        = MVC_ROOT + '/views';
 global.MVC_MODELS       = MVC_ROOT + '/models';
 global.MVC_CONTROLLERS  = MVC_ROOT + '/controllers';
 global.MVC_HELPERS      = MVC_ROOT + '/helpers';
 global.MVC_SESSION_KEY  = 'ac';

 global.MONGODB_SERVER_NAME  = 'localhost';
 global.MONGODB_DB_NAME      = 'ac2'; // Change this for each app you develop!
 global.MONGODB_PORT         = 27017;

 global.PHP_BINARY = false;
 global.PHP_INI = false;
 global.MVC_PORT = 3000;

 global.MVC_SITE_NAME = 'Arena Colles';

 */