sys = require 'util'
exec = require('child_process').exec;

module.exports = ( host, callback ) ->
    exec "ping -c 4 #{host}", callback