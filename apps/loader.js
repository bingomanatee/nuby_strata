var strata = require('strata');

module.exports = function (context, callback){
    console.log('app specific loader');
    var config = context.config;
    context.app.use(strata.static, config.layout_root);
    callback(null, context);
}