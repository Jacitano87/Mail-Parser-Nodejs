/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/

//Schema of Mongodb

var mongoose = require('mongoose');

var mailSchema = require('../schemas/schemaMail');


var Element = mongoose.model('mailModel00001',mailSchema);


module.exports = Element;