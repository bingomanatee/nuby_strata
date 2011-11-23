var strata = require('../../node_modules/strata');

var app = new strata.Builder;
app.use(strata.commonLogger);
app.use(strata.contentType, 'text/plain');
app.use(strata.contentLength);

function _headers(content) {
    return {
        "Content-Type": "text/plain",
        "Content-Length": Buffer.byteLength(content).toString()
    }
}

app.get('/', function(env, callback) {
    var content = 'hello world';
    callback(200, _headers(content), content);
})

module.exports = app;