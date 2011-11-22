var vows = require('vows');
var assert = require('assert');
var content = 'simple world';
var mock = require('strata/lib/mock');

var suite = vows.describe('simple server');
suite.addBatch({

    'app as function': {
        topic: function (){
            var app = require('vows_context/simple_mvc_server/app');
            mock.request({requestMethod: "GET"}, app, this.callback);
        },

        'test i/o': function(err, status, headers, body){
            assert.equal(body, content);
        }
    }
}).export(module);