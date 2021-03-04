# EasyFileReader.js

## Introduction
- This Library facilitates the implementation of JavaScript file reading capabilities into your HTML's Event Listeners. 
-- This Library supports reading multiple files at once and returns the file metadata as well as the file contents. 
-- Finally, it includes an optional script to assist with the creation of the relevant Event Listeners

## Contents
- The Library includes a primary script (EasyFileReader.js) and an optional secondary script (EasyListener.js) 
-- Each of those scripts have their own section in this file which explains their purpose, functionality, and implementation in greater detail
-- Additionally, there is an example index.html file which demonstrates the use of these scripts (and an accomponying stylesheet.css file for stylization)

# The "EasyFileReader" Class

## Purpose: 
- This Class facilitates the Reading of 1+ files asyncronously and returning the files content and metedata if possible
-- The file's "metadata.type" atribute will be compared against lists of known mimetypes to determine what "category" of file it is
-- Files from the "text" category will return their text content as the "plaintext" attribute
-- The base64 encoded data of the file will be returned for a variety of files as the "encoded" attribute
-- The "name", "lastModified", "type" and "size" metadata attributes will also be returned


## Input Parameters: 
- This Class no longer requires any arguments upon instantiation.
- A fileList argument must be passed to the .readFiles() method as detailed further below
-- Typically the fileList argument will be derived from certain Event Listeners

### fileList : [Mandatory] 
- The fileList parameter must be an aray containing file data as derived from certain Event Listeners
-- The specific supported events are:
+ "dragover" event listener on most html elements
++ ( typically a \<div>, \<form> or \<textarea> element would be suggested, though other elements such as \<p> also work. )
++ The FileObject providing attribute is "event.dataTransfer.files"

+  "change" event listener for an <input type="file"> element
++ The FileObject providing attribute is "event.target.files"
   
## Useable Methods: 
- While this Class actually has a number of methods, only one of them is actually intended to be used externally (the other methods are used by the primary method):

### .readFiles( FileList )
- Takes in a FileList, as explained above, and returns:
* the content of the file(s) 
* some file metadata
* OR an error message

### Output Data:
- The outgoing data is returned in the form of an array containing objects with one object per file 
-- This occurs whether or not the file was sucessfully read or it was skipped
-- These Objects have the following properties (having the noted Data types):
````javascript
{
 category,		// a string; consisting of the file's "category", as determined by it's mime-type 
 encoded, 		// a string; consisting of the base64 encoded contents of the file
 err,			// a string; consisting of an error message on error OR null on success
 fileName,		// a string; consisting of the file's name
 fileExt,		// a string; consisting of the file's extention, as determined using a regular expression
 lastModified,	// a number; consisting of the last modified timestamp in miliseconds ( from epoch )
 plaintext,		// a string; consisting of the actual text contents of the file ( if applicable )
 size,			// a number; consisting of the number of bytes that the file takes up 
 type			// a string; consisting of the file's mime-type 
}
````

## Using this Class: 
- This Class is intended to be used as part of an Event Listener.
1. Instantiate the Class
````javascript
myFileReader = new EasyFileReader()
````
2. After Instantiation, you can call the ".readFiles()" method on a list of files; which will return the processed files asyncronously
````javascript
let loadedData = await myFileReader.readFiles( event.dataTransfer.files )
````
3. Once the ".readFiles()" method is done, it returns an array of objects as detailed above
````javascript
console.log( loadedData )
````

## The File Categories (and their mime-types):
- 'audio'
* [ 'audio/mpeg', 'audio/mid' ]
- 'image'
[ 'image/bmp', 'image/gif','image/jpeg','image/png','image/svg+xml','image/x-icon' ]
- 'text'
* ['application/json', 'text/css', 'text/csv', 'text/javascript', 'text/plain', 'text/html' ]
- 'richText'
* [ 'application/msword', 'application/vnd.ms-excel']
** 'application/msword' seems to include: .doc and .rtf 
- 'video'
['video/avi', 'video/mp4']
- 'pdf'
* [ "application/pdf" ]
- 'compressed',
* [ 'application/x-zip-compressed' ]

## Some Important Notes:
1: That this Class Method asynchronously returns data via await
* If you try to use the data synchronously, it will return undefined before the method finishes and you won't be able to access the processed data

2: If you are using "Drop" or "Drag" Event Listeners, you will need to prevent their default functionality via "event.preventDefault()"
- This can be added to the Event Listener which calls this functionality or it can be globally prevented via "window.addEventListener"
- The companion file, "EasyListener.js", includes a Class which further streamlines the implementation of the EasyFileReader class 

3. The File Category List is still a work in progress
- Some file types (such as .MD) don't seem to have a mime-type at all 

# The "EasyListener" class

## Purpose: This Class is an optional companion to the "EasyFileReader" class
- Facilitates the implementation of the "EasyFileReader" class.
-- Specifically, simpifies the tying of HTML elements and JavaScript Callback functions to Instances of the Class and it's ".readFiles()" method

## Input Parameters:
- This Class takes in 2 mandatory inputs upon Instantiation.

### domTarget : [Mandatory]
- A string containing the "id" value of an HTML element which is to be the target of the event listener.

### callback : [Mandatory]
- A JavaScript Callback function. 
-- This Callback funcation can either anonymously declared or a named function can be referenced.

## Useable Methods: 
- This Class has two useable methods. 
* These methods are fairly similar, however one is for input buttons HTML elements and the other is for any HTML element which you might want to drag the files onto. 
** Neither of these methods require any input parameters. 
** Additionally, the desired method should be called immediately upon instantiation.  

### fileButtonListener()
- This method can be tied to \<input type="file"> HTML elements only.

### fileDropListener()
- This method can be tied to most HTML elements (though \<div> , \<form> or \<textarea> are the most likely uses.
-- \<p> is has also been shown to be useable in testing

## Output Data: 
- The data from "EasyFileReader.fileRead()" comes in the form of an array filled with objects.
-- This data is pushed directly to the callback function, which may alter the results further.

## Using this Class: 
- This class uses the 'id' of an HTML element and a JavaScript Callback function.
1. Place your HTML element and make sure that it has a unique 'id' value
````javascript
<div id="drop_zone">Drop files here</div>
````
2. Define a Callback function (which takes the returned data as an argument)
````javascript       
myCallback = ( dataArray ) => { 
	dataArray.forEach( fileData => console.log(fileData) )
}
````
3. Instantiate the Class with the "id" of your HTML target element and your JavaScript callback functions as arguments. 
* Additionally, call the desired method (as described above) at the same time. 
````javascript
new EasyListener("drop_zone", myCallback).fileDropListener()
````


## Author: Jon Spencer (spenjo7)