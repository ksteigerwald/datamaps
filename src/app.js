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
    var max = (up || 10), min = (low || 0);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return {
    'randomNumber' : randomNumber
  }
}());
