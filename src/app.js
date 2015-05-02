var Server = (function() {

  var data = {
    viruses: ['APT1', 'Botnet', 'SPAM', 'StealCreds'],
    owner: ['Anderson Services', 'TMQ Financial'],
    servers: ['web', 'ftp', 'mail']
  }

  var infected = {
    '10.223.75.186': {
       owner: '',
       virus:[],
       servers: ''
      }
  };

  var _hasKey = function(obj, key) {
    return obj.hasOwnProperty(key);
  },

  _randomThing = function(key) {
    if(!_hasKey(data, key)) return false;
    return data[key][randomNumber(data[key].length-1, 0)];
  };

  var randomNumber = function(up,low, fix) {
    var max = (up || 10), min = (low || 1), fixed = (fix || 0);
    return (Math.random() * (max - min) + min).toFixed(fixed) * 1;
  },

  ipMePlease = function() {
    return '10.'.concat(randomNumber(200,299),'.',randomNumber(10,99),'.',randomNumber(100,200));
  },

  getLong = function() {
    return randomNumber(-180, 180, 3);
  },

  getLat = function() {
    return randomNumber(-90, 90, 3);
  },

  plot = function() {
    return {
      ip: ipMePlease(),
      virus: [ _randomThing('viruses') ],
      owner: _randomThing('owner'),
      servers: [ _randomThing('servers') ]
    }
  },

  on = function() {
    return function() {
    }
  }

  return {
    'randomNumber' : randomNumber,
    'ipMePlease' : ipMePlease,
    'getLong' : getLong,
    'getLat' : getLat,
    'plot' : plot
  }
}());
