/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database');
module.exports = mongoose;