/**
 *
 * CORE APPLICATION
 * 
 */
 var strata_mvc = require('nuby-strata');
var config = require('./config').create(__dirname);

var context = nuby_strata.context.create(config);

function _on_app(err, app) {
    if (err) return callback(err);

    callback(err, app);
}

var app = new strata.Builder();
app.use(strata.contentType, 'text/plain');
app.use(strata.contentLength);

nuby_strata.load_apps(config.app_path, _on_app, context, app);