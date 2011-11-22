/**
 *
 * CORE APPLICATION
 * 
 */

var Config = require(__dirname + '/config');
var strata_mvc = require('strata_mvc');
var config = new Config(__dirname);

var app = strata_mvc.load_apps(config.app_path, config);
app.run();