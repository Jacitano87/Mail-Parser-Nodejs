/*
This file is part of MailParserNodejs package.
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
*/

var http = require('http');
console.log('Avvio Server...');
console.log('Server running at http://127.0.0.1:4000/');

var mkdirp = require('mkdirp');
console.log( "___  ___      _ _______");
console.log(		"|  \\/  |     (_) | ___ \\    ");
console.log(		"| .  . | __ _ _| | |_/ /_ _ _ __ ___  ___ _ __ ");
console.log(		"| |\\/| |/ _` | | |  __/ _` | '__/ __|/ _ \\ '__|");
console.log(		"| |  | | (_| | | | | | (_| | |  \\__ \\  __/ |   ");
console.log(		"\\_|  |_/\\__,_|_|_\\_|  \\__,_|_|  |___/\\___|_| \n");


console.log("-----------------------------------\n");
console.log("Instruction : Open new console or browser and Digit http://localhost:4000 and \n");
console.log('1) To Insert From Directory :  /parseMailFromDirectory?directory= ');
console.log('2) To Insert Manually :  /parseMail?mail= ');
console.log('3) To Search Mail :  /searchMail?mail= ');
console.log('4) To Delete Mail :  /removeMail?mail= ');
console.log('5) To Ping Domains :  /ping ');
console.log("-----------------------------------\n");

var mongoose  = require('../mailParser-nodejs/connectdb/connectMongoDb');
var Element = require('../mailParser-nodejs/model/mailModel');
var insertMail = require('../mailParser-nodejs/insertMail.js');
var express = require('express');
var server = express();



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

});



var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;




server.get('/parseMailFromDirectory',function(req,res){
  
     if(req.param('directory')){
        var tempDirectory ='./Simulation/'+(req.param('directory'))+'/';
       var simulation = req.param('directory'); 
     }
    
    //Ceck for each file in Mail folder
    
 var array = [];   
  var fs = require('fs');
fs.readdir(tempDirectory, function (err, files) {
 if (err)
    throw err;
    var path_simulazione = "./Mail/"+simulation;
    mkdirp(path_simulazione, function(err) { 

});
 for (var index in files) {
  
     var path = require('path')
 
    var ext = path.extname(files[index]||'').split('.');
    var estenzione = ext[ext.length - 1];
     
     if(estenzione =='txt'){
     array[index] = files[index];

    var tmp =tempDirectory+files[index];
       
      ceckAndSaveMail(tmp,files[index]); // CORRECT FUNCTION
    
     }
     
 }
   
 });  
    
  

 
    
   
    
});

 //This Function as called to compare HTML file and extract every MAIL

function ceckAndSaveMail(valore,file)
{
    
        var fs = require('fs');
     var Regex = require("regex");
    var regex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|it)\b/;
    
   
    
    var extractor = require('file-extractor');
     
    var s = fs.createReadStream(valore,{encoding: 'utf8'});
    extractor({'count': 0}).matches(re,function(m, vars){
    
        // IF Comparing HTML with Ceck there is a Mail save it on database and into file
        
     if(regex.test(m[0]))
        {   
         var mailSave = {
            mail: m[0],
        	pathFile: valore,
                        };
      
        // Ceck if Mail was already saved into database    
      
            Element.find({ mail: mailSave.mail}, 'mail',function (err, elem) {
                
                if(err){console.log('errore'+err)}
	 
                if(elem.length == 0)
	            {
                        var newElement = new Element(mailSave);
	    	 
                    newElement.save(function(err, product){
                       
                        if(err){}
  				        
                        console.log("saved : [{ _id:" + product._id + " mail:"+ product.mail + "}]");
                        
                        var tmpPath = './Mail/'+simulation+'/'+file;
        
         //Write into File a Mail founded         
                        
                        fs.writeFile(tmpPath, m[0], function (err) {
                           if (err) return console.log(err);
                                console.log("Saved:"+tmpPath+" path:"+ valore +" ");
                        }); //closeWriteFile
                        
                        
  				         
                      }); 
	            }	
	            else
	           {
	 	                   console.log('Mail: '+ mailSave.mail +' not insered (duplicated)');
                        
               }
            });
        
  }
        vars.count ++;
    }).on('end', function(vars){
    }).start(s);   
    
   
    
}




//This function Ceck if your mail (Added with a string) is correctly mail or not 


server.get('/parseMailManually',function(req,res){
  
   var Regex = require("regex");
var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    
    
     //Testing regex with string mail
    
  if(regex.test(req.param('mail')))
  {
     console.log('Correct : '+req.param('mail'));
  
        var mailSave = {
            mail:req.param('mail'),
        	pathFile: 'null',
};
        
        
            Element.find({ mail: mailSave.mail}, 'mail',function (err, elem) {
	 if(err){console.log('error'+err)}
	 
	
	 
	 if(elem.length == 0)
	 {
	 	
	 
	 var newElement = new Element(mailSave);
	    	 
		 newElement.save(function(err, product){
  				if(err){}
  			//	console.log("saved : [{ _id:" + product._id + " mail:"+ product.mail + "}]");
  				res.write("saved : [{ _id:" + product._id + " mail:"+ product.mail + "}]");

   		}); 
	 }	
	 else
	 {
	 	//console.log('Mail: '+ mailSave.mail +' not insered (duplicated)');
        res.write('Mail: '+ req.param('mail') +' not insered (duplicated)');
	 }
    });
       
        
        
    
    
    
      }
    else
    {
     console.log("Mail inserita non valida non valida..."); 
     res.write("Mail inserita non valida non valida...\n"); 
    }
    
    res.end("Operation completed...");   
    
    
});


//Search mail into database

server.get('/searchMail',function(req,res){

    var mailSave = {
            mail:req.param('mail'),
        	pathFile: 'null',
};
        
            console.log("Email to find :"+mailSave.mail);
            
                Element.findOne({ mail : mailSave.mail}, 'mail',function (err, elem) {
                    
                        if(err){console.log('errore'+err)}
	 
	       if(elem)
	       {
                console.log('Mail Found : '+ elem.mail );
               res.write("Mail Found :"+ e.mail + "\n");
	       }	
	   
          else
          {
	 	         console.log('Mail not Found in database...');
                res.write('Mail not Found in database... \n');
	       }
                
        res.end("Operation completed...");         
    });
});
       
//function ping for each domain mail into database        

server.get('/ping',function(req,res){

    
    var ping = require('ping');
    
       
            Element.find({},'_id mail',function (err, elem) {
	 if(err){console.log('errore'+err)}
	 
	 if(elem)
	 {
         
         elem.forEach(function(e, index, array) {
             
            var object = GetEmailParts(e.mail);
             var result  = object.domain + "." + object.ext;
             //console.log(result);

                var hosts = [result];
             
             
                    hosts.forEach(function(host){
                            ping.sys.probe(host, function(isAlive){
                                    if(isAlive)
                                        {
                                            var msg = 'host:' + host + ' successed...';
                                            console.log(msg);
                                            //res.write(msg + "\n");
                                        }
                                else
                                        {
                                            var msg = 'host:' + host + ' failed...';
                                            console.log(msg);
                                            //res.write(msg + "\n");
                                        }
        
                            });
                 
                    });
                                    
	 	  
         });
          

	   }	
	   else
	   {
	 	 console.log('No Mail in database...\n');
	   }
                
        res.end("Operation completed...");
            });
    
    
});
        
  
    

server.get('/removeMail',function(req,res){

      var mailSave = {
            mail:req.param('mail'),
        	pathFile: 'null',
};
    
            Element.find({mail:mailSave.mail},'_id',function (err, elem) {
     
                Element .remove({}, function (err) {
                        if (err) return handleError(err);
                        console.log("Removed...");
                        
                    res.end(mailSave.mail + " Removed... \n");
            });
     
     
 });

    
    });

    

//function used in Ping 

function GetEmailParts( strEmail ){
    // Set up a default structure with null values 
    // incase our email matching fails.
    var objParts = {
        user: null,
        domain: null,
        ext: null
        };
    
    // Get the parts of the email address by leveraging
    // the String::replace method. Notice that we are 
    // matching on the whole string using ^...$ notation.
    strEmail.replace( 
        new RegExp( "^(.+)@(.+)\\.(\\w+)$" , "i" ), 
        
        // Send the match to the sub-function.
        function( $0, $1, $2, $3 ){
            objParts.user = $1;
            objParts.domain = $2;
            objParts.ext = $3;
        }
        );
    
    
    return( objParts );
}



// Print all Mail into db

server.get('/print', function(req, res){

 Element.find({}, function (err, result) {
  
     if (err) return handleError(err);
        else
   {
       result.forEach(function(product){
      
           
      console.log(" Path:"+ product.pathFile + " Mail:"+ product.mail);	
           
    });
       
   
     
 	
    
   }
})
    
    
});




/*   JUST ME TEST

function parseFromCrawler(valore,nomeFile)
{
    //console.log("temp1:"+valore);
    var   fs = require('fs');
    var Regex = require("regex");
    
    var regex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|it)\b/;

    var extractor = require('file-extractor');
 
    var s = fs.createReadStream(valore,{encoding: 'utf8'});
    extractor({'count': 0}).matches(re,function(m, vars){
     
        console.log("temp:"+m[0]);
        if(regex.test(m[0]))
  {   
      
         fs.writeFile(nomeFile, m[0], function (err) {
  if (err) return console.log(err);
  console.log("Salvato path:"+tempPath+" path:"+ valore +" ");
      }); //closeWriteFile
      
      
}
        else
        {
         console.log("No mail found path:");   
        }

        })
       
      
    
   // res.send('Eseguito');   
    
    
    
 
      
    
}

*/



server.listen(4000);