/*
This file is part of CrawlerNodeJS package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/

var mongoose = require('mongoose');



var mail = new  mongoose.Schema({
	
     	   mail: String,
           pathFile: String,
         //data:  { type: Date, default: Date.now },

                
		
});




module.exports = mail;
