(function() {
  var comm, sys;

  sys = require('util');

  ping = require('./lib/ping');

  ping('google.com', function(error, stdout, stderr) {
    return sys.puts(stdout);
  });

}).call(this);
