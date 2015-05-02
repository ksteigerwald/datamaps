var Server = (function() {
  var cast;

  var data = {
    viruses: ['APT1', 'Botnet', 'SPAM', 'StealCreds'],
    owner: ['Anderson Services', 'TMQ Financial'],
    servers: ['web', 'ftp', 'mail']
  }

  var infected = {};

  /* PRIVATE */

  var _hasKey = function(obj, key) {
    return obj.hasOwnProperty(key);
  },

  _small = function(i) {
    return Math.floor(Math.random() * i);
  },

  _randomThing = function(key) {
    if(!_hasKey(data, key)) return false;
    return data[key][_small(data[key].length)];
  },

  _keyit = function(obj, ip) {
    return function(key) {
      var val = _randomThing(key);
      obj[ip][key] = (key == 'viruses') ? [val] : val;
      return obj;
    }
  },

  _newPlot = function() {
    var obj = {},
         ip = ipMePlease();

    obj[ip] = {
      geo: [getLat(), getLong()].join(',')
    };

    var plot = _keyit(obj, ip);

    return ['viruses', 'owner', 'servers'].map(plot).pop();
  },

  _simulate = function() {
    var count = 0;
    return function(plot) {
      if(count >= 5){

        count = 0;
        var keys = Object.keys(infected)
             key = keys[randomNumber(keys.length-1, 1)],
            obj = {};

        obj[key] = infected[key];
        return obj;
      }
      count++;
      return plot;
    }
  },

  _repeat = _simulate(),

  _contains = function(plot) {
    var key = Object.keys(plot)[0];
    if(infected[key]) {
      var virus = data.viruses[randomNumber(3,0)], obj = {};
      infected[key].viruses.push(virus);
      obj[key] = infected[key];
      return obj;
    }
    return plot;
  },

  _infect = function(plot) {
    var key = Object.keys(plot)[0];
    infected[key] = plot[key];
    return plot;
  },

  _compose = function() {
    var fns = arguments;
    return function(result) {
      for (var i = fns.length -1; i > -1; i--) {
        result = fns[i].call(this, result);
      }
      return result;
    }
  };

  /* PUBLIC */

  var randomNumber = function(up,low, fix) {
    var max = (up || 10), min = (low || 1), fixed = (fix || 0);
    return (Math.random() * (max - min) + min).toFixed(fixed) * 1;
  },

  ipMePlease = function() {
    return [10,[200, 299],[10, 99],[100, 200]].map(function(val) {
      return (typeof val == 'object') ? randomNumber(val[0], val[1]) : val;
    }).join('.');
  },

  getLong = function() {
    return randomNumber(-180, 180, 3);
  },

  getLat = function() {
    return randomNumber(-90, 90, 3);
  },

  plot = function(ip){
    var infect = _compose(_infect, _contains, _repeat, _newPlot);
    var hit = infect()
    return hit;
  },

  start = function() {
    if(cast) stop();
    cast = setInterval(plot,200);
    return cast
  },

  stop = function() {
    clearInterval(cast);
  },

  memory = function() {
    return infected;
  }

  return {
    'randomNumber' : randomNumber,
    'ipMePlease' : ipMePlease,
    'getLong' : getLong,
    'getLat' : getLat,
    'plot' : plot,
    'start' : start,
    'stop' : stop,
    'memory' : memory
  }
}());
