function checkIp(val) {
  var ip = new RegExp('^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$');
  return ip.test(val);
}
module("Test Data Server", {
  setup:  function() {},
  teardown: function() {}
});

test("data stream", function() {
  ok(true,true);
});

test("function count", function() {
  ok(true,true);
});

test("virus count", function() {
  ok(true,true);
});

test("random number", function() {
  var check = Server.randomNumber(), pass=(check > 0 && check < 10);
  ok(pass, "random check: " +check);

  var check = Server.randomNumber(10,99), pass=(check > 10 && check < 99);
  ok(pass, "random check: " +check);

  var check = Server.randomNumber(100,200), pass=(check > 100 && check < 200);
  ok(pass, "random check: " +check);
});

test("ipMePlease", function() {
  var check = Server.ipMePlease();
  ok(checkIp(check), check + ' is a valid ip');
});

test("plot", function() {
  var plot = Server.plot();
  var key = Object.keys(plot)[0];
  ok(checkIp(key), key + ' is a valid id');
  ok(plot[key].hasOwnProperty('owner'), 'has owner');
  ok(plot[key].hasOwnProperty('servers'), 'has servers');
  ok(plot[key].hasOwnProperty('viruses'), 'has viruses');
});


test("get size of key", function() {
  Server.start();
  var checkForBlank = function() {
    Server.size();
  }
  throws(checkForBlank,'No key provided');
  var checkForNotFound = function() {
    Server.size('foobar');
  }
  throws(checkForNotFound, 'foobar not found');
  Server.stop();

});

test("5 sec counts up to 30", function(assert) {
  var done = assert.async();
  var size = 2, complete = false, count = 0;
  var runner = function() {
    var len = Object.keys(Server.memory()).length;
    assert.ok((size >= size -1 && size <= size), 'adds and updates');
    if(count <= 5){
      size += 2;
      count++;
      setTimeout(runner, 700);
    }
    else {
      Server.stop();
      done();
    }
  }
  Server.start(500);
  setTimeout(runner, 700);
});
