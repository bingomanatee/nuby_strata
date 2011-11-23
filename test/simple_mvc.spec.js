
var assert = require('assert');
var content = 'simple world';
var mock = require('../node_modules/strata/lib/mock');
var util = require('util');

describe('strata basic', function(){
    var app;
    beforeEach(function (){
            app = require('./simple_mvc_server/app');
    })

     describe('body', function(done){

         mock.request({requestMethod: "GET"}, app,
         function(err, status, headers, body){
             console.log('err', util.inspect(err));
             console.log('status', util.inspect(status));
             console.log('headers', util.inspect(headers));
             console.log('body', body);
             
             if(body != content) throw new Error('body (' + body + ') is not content');
             done();
         });

     });
});