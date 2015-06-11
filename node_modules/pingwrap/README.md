## Node.js Ping utility
   A easy to use utility for node.js to send ping requests

##Installation

Make sure you have the latest node, coffee-script and npm installed. To run:

    $ coffee app.coffee

For those coffee haters, I have compiled it to native javascript. To run:

    $ node app.js


## Usage

First include it to your application

    var ping = require('./lib/ping');

You can then call the ping function by passing it two arguments:

    ping( [hostname/ip], [callback] );


## Example:

    sys = require('util');
    ping = require('./lib/ping');

    ping('google.com', function(error, stdout, stderr) {
      return sys.puts(stdout);
    });