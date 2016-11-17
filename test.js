var test = require('prova');
var json = require("./");

test('get last songs from radio paradise api', function (t) {
  json('http://api.listenparadise.org', function (error, body) {
    t.plan(3);
    t.error(error);
    t.ok(body.ok);
    t.equal(body.result.length, 4);
  });
});

test('get repositories from GitHub', function (t) {
  json('https://api.github.com/repositories', { 'headers': { 'User-Agent': 'A user agent' } }, function (error, body) {
    t.plan(4);
    t.error(error);
    t.ok(body[0]);
    t.ok(body[0].name);
    t.equal(body.length, 100);
  });
});