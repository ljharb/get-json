var test = require('prova');
var json = require('../');

test('Get IP from JSONTest API', function(t) {
  json('http://ip.jsontest.com/', function(error, body) {
    t.plan(2);
    t.error(error);
    t.ok(body.ip);
  });
});

test('Get IP from JSONTest API (with Promise)', function(t) {
  t.plan(1);

  json('http://ip.jsontest.com/')
    .then(function(body) {
      t.ok(body.ip);
    }).catch(function(error) {
      t.ok(error);
    });
});
