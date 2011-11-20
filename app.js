/**
 *
 * CORE APPLICATION
 * 
 */

var strata = require('strata');
var config = require(__dirname + '/config');
var strata_mvc = require('strata_mvc');

config.init(__dirname);

strata_mvc.load_apps(__dirname + '/apps', config);