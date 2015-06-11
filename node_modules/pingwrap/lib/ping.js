(function() {
  var exec, sys;

  sys = require('util');

  exec = require('child_process').exec;

  module.exports = function(host, callback) {
      return exec("ping -c 4 " + host, callback);
    };

}).call(this);
