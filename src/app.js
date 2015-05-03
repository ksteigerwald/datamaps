var BaseView = (function() {
  var $doc = '',
   $output = '';

  var actions = {
    doc: '',
    $output: '',
    template: function() {
      return $(this.doc).html();
    },

    render: function(data) {
      var output = Mustache.render(this.template(), data);
      $(this.$output).html(output);
    }
  }
  return actions;
}());

var CountsVirusView = (function(view) {

  view.doc = '#tmp-counts';
  view.$output = '#virus-count';

  var mock = {list:[{name: 'spam', count:0}]}

  var _parse = function(data,key) {
    return {name: key, count: data[key]};
  },

  _update = function() {
    var data = Server.log().viruses;
    var list = Object.keys(data).map(_parse.bind(this, data));
    view.render({list:list});
  },

  _subscribe = function() {
    $(window).bind('data:pushed', _update)
  };

  var actions = {
    setup: function() {
      _subscribe();
      view.render(mock);
    }
  }

  return actions;
}($.extend({},BaseView)));


var CountsInfectionView = (function(view) {

  view.doc = '#tmp-counts';
  view.$output = '#infected-count';

  var mock = {list:[{name: 'spam', count:0}]}

  var _parse = function(data,key) {
    return {name: key, count: data[key]};
  },

  _update = function() {
    var data = Server.log().servers;
    var list = Object.keys(data).map(_parse.bind(this, data));
    view.render({list:list});
  },

  _subscribe = function() {
   $(window).bind('data:pushed', _update)
  };

  var actions = {
    setup: function() {
      _subscribe();
      view.render(mock);
    }
  }

  return actions;

}($.extend({},BaseView)));


var TableView = (function() {

  view.doc = '#tmp-table';
  view.$output = 'table > tbody';

  var _parse = function(data,key) {
    return {name: key, count: data[key]};
  },

  _update = function() {
    var data = Server.memory();
    var list = Object.keys(data).map(_parse.bind(this, data));
    view.render({ list: list });
  },

  _subscribe = function() {
   $(window).bind('data:pushed', _update)
  };

  var actions = {
    setup: function() {
      _subscribe();
      view.render(mock);
    }
  }

  return actions;
}($.extend({},BaseView)));

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
          '<br/>Servers: ' +  data.server + '',
            '</div>'].join('');
        }
      });
    }

  }
  return actions ;
}());

Server.start(500, function() {
  $(window).trigger('data:pushed');
});

$(function() {
  MapView.render();
  CountsVirusView.setup();
  CountsInfectionView.setup();
})

