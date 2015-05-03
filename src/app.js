var CountsView = (function() {

  var $li = "<li>{{point}}</li>"
    var actions = {
      render: function() {
      }
    }
  return actions;
}());
var bombs = [{
  name: 'Joe 4',
  radius: 25,
  yield: 400,
  country: 'USSR',
  fillKey: 'RUS',
  significance: 'First fusion weapon test by the USSR (not "staged")',
  date: '1953-08-12',
  latitude: 50.07,
  longitude: 78.43
},{
  name: 'RDS-37',
  radius: 40,
  yield: 1600,
  country: 'USSR',
  fillKey: 'RUS',
  significance: 'First "staged" thermonuclear weapon test by the USSR (deployable)',
  date: '1955-11-22',
  latitude: -50.07,
  longitude: 78.43

},{
  name: 'Tsar Bomba',
  radius: 75,
  yield: 50000,
  country: 'USSR',
  fillKey: 'RUS',
  significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
  date: '1961-10-31',
  latitude: 73.482,
  longitude: 54.5854
}
];

var MapView = (function() {
  var actions = {
    render: function() {
      this.map = new Datamap({
        element: document.getElementById('usofa'),
        scope: 'usa',
        highlightOnHover: false,
        popupOnHover: false
      });
    },
    list: function() {
      var keys = Object.keys(Server.memory()), items = Server.memory();
      return keys.map(function(v) {

        var item = items[v],
             geo = item.geo.split(',');

        return {
          name: v,
          radius: 5,
          viruses: item.viruses.join(','),
          company: item.owner,
          server: item.servers,
          latitude: Number(geo[0]),
          longitude: Number(geo[1])
        }
      });
    },

    map: function() {
      return this.map();
    },

    bub: function() {
      this.map.bubbles(this.list(), {
        popupTemplate: function (geo, data) {
          return ['<div class="hoverinfo">' +  data.name,
          '<br/>Viruses: ' +  data.viruses ,
          '<br/>Company: ' +  data.company + '',
          '<br/>Servers: ' +  data.servers + '',
            '</div>'].join('');
        }
      });
    }
  }
  return actions ;
}());

MapView.render();
