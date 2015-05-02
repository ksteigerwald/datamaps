var CountsView = (function() {

  var $li = "<li>{{point}}</li>"
  var actions = {
    render: function() {
    }
  }
  return actions;
}());

var MapView = (function() {
  var actions = {
    render: function() {
      var map = new Datamap({
        element: document.getElementById('usofa'),
        scope: 'usa'
      });
    }
  }
  return actions ;
}());
