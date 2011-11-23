describe('root tests', function(){
  it('basic test', function(){
    expect(1+2).toEqual(3);
  });

    
});

        var foo = require('foo');
        console.log(require('util').inspect(foo));
console.log('current working direcgtory', process.cwd());
describe ('module tests', function(){

    it ('foo test', function(){
        expect(foo(2)).toEqual(4);
    })


});