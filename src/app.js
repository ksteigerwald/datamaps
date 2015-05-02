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

  var randomNumber = function(up,low) {
    var max = (up || 10), min = (low || 1);
    return Math.floor(Math.random() * (max - min) + min);
  },

  ipMePlease = function() {
    return '10.'.concat(randomNumber(200,299),'.',randomNumber(10,99),'.',randomNumber(100,200));
  }

  return {
    'randomNumber' : randomNumber,
    'ipMePlease' : ipMePlease
  }
}());
