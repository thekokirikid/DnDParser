# DnDParser

This is an application to verify XML files as well as run a spelling check on the content of the XML files. It uses redis to host a dictionary of words, and if new words are encountered in the XML files, the user may choose to add the word to this dictionary. 

#To Run:
After cloning the repository and installing NodeJS, run:

  src/redis-server
  
This will start up the redis server. To test loading the dictionary into redis, run the command:

  node dictionaryServer.js

After starting the redis server you must create a directory called 'xml_files' and place all the Application XML files in this directory.

  mkdir xml_files

To run the parser run:

  node parser.js
  
If there is an error with the syntax of an xml file an error will be displayed depicting the file and the error in that file.
  
  
