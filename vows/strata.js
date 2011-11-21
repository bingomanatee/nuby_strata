var vows = require('vows');
var assert = require('assert');

var suite = vows.describe('strata server');

suite.addBatch({

    'app as function': {
        topic: function (){
            var app = require('vows_context/strata_server');
            mock.request({requestMethod: "HEAD"}, app, this.callback);
        },

        'test i/o': function(err, status, headers, body){
            assert.equal(headers['Content-Length'], "0");
        }
    }
})