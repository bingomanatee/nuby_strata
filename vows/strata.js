var vows = require('vows');
var assert = require('assert');
var content = 'hello world';
var mock = require('strata/lib/mock');

var suite = vows.describe('strata server');
suite.addBatch({

    'app as function': {
        topic: function (){
            var app = require('vows_context/strata_server');
            mock.request({requestMethod: "GET"}, app, this.callback);
        },

        'test i/o': function(err, status, headers, body){
            assert.equal(headers['Content-Length'], Buffer.byteLength(content));
            assert.equal(body, content);
        }
    }
}).export(module);