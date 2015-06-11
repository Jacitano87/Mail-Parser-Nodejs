sys = require 'util'
ping = require './lib/ping'

ping 'google.com', ( error, stdout, stderr ) ->
  sys.puts stdout


