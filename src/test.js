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
});
