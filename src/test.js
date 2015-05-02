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
  var ip = new RegExp('^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$'), check = Server.ipMePlease();
  ok(ip.test(check), check+' is a valid ip');
});


