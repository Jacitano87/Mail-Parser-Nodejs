# MailParserNodejs
## Mail Parser written in NodeJS with MongoDb 

###What is MailParserNodejs

MailParserNodejs is a mail Parser written in NodeJS that take in input one directory and for each file ceck and save into Db every Mail Founded.

MailParserNodejs save each Mail founded in a MongoDb Database , and in a txt file. However is possible perform request
to print every mail into Db, or to compare a mail with a Regex to understand if it is Valid or not.

###Installation & configuration
After download and install NodeJS and MongoDB and dipendence, Download this source code and start using ‘ node mailParserNodejs ‘ command in your terminal. The server running on port 8081. 

###How start
Start MailParserNodejs is very simple. Open your terminal or Browser.

Terminal Case example:

curl --data "directory=Simulation1433967344085" http://localhost:8081/findUrlFromMail
 
You can change name of your directory. This is Just a test for my Project.  
 
###Credits

The MailParserNodejs code was developed as a project for University of Catania - Compilatori  in June 2015  

Fischetti Antonio (http://antoniofischetti.it)
        GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2015.
