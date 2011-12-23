/**
 *
 * CORE APPLICATION
 * 
 */

var nuby_strata = require('nuby-strata');
var strata      = require('nuby-strata/node_modules/strata');
var cfg         = require('./config');
var util        = require('util');

var config  = cfg.create(__dirname);
var context = nuby_strata.context.create(config);

var app = new strata.Builder();
app.use(strata.contentType, 'text/plain');
app.use(strata.contentLength);
app.use(nuby_strata.loader.static.create, config.static_resources);
app.use(strata.sessionCookie, config.session);

function _on_app(err, context) {
    if (err){
        throw err;
    }
    console.log('_on_run - context = %s', util.inspect(context, true, 0));
    context.run();
}

console.log('loading ; config =  %s', util.inspect(config, false, 0));
nuby_strata.loader.load_apps(config.app_path, _on_app, context, app);