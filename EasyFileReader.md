# The "EasyFileReader" Class

## Purpose: This Class facilitates the Reading of 1+ files asyncronously 
and returning the contents + metadata of the read files 

## Input Parameters: 
- This Class takes in 1 optional Argument upon instantiation and one mandatory Argument upon calling the ".readFiles()" method.

### allowedFileTypes : [Optional]
- An Array containing the text strings of the file types which you would like to permit.
-- Some examples are:
* "application/json" or "text/plain"
** If this Optional Parameter is ommited, all file types will be allowed 
** this does not mean that the files will read correctly, only that the class will attempt to read those files (which could cause bugs to occur)

### fileList : [Mandatory] < derived from certain Event Listeners >
- The specific supported events are:
+ "dragover" event listener on most html elements
++ ( typically a \<div>, \<form> or \<textarea> element would be suggested, though other elements such as \<p> also work. )
++ The FileObject providing attribute is "event.dataTransfer.files"

+  "change" event listener for an <input type="file"> element
++ The FileObject providing attribute is "event.target.files"
   
## Useable Methods: 
- While this Class actually has 4 methods, only one of them is actually intended to be used externally (the other methods are used by the primary method):

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
 metadata:{
	name,					// a string; containing the file's name
	lastModified,			// a number; containing the last modified timestamp in miliseconds
	lastModifiedDate,		// a date object; containing the last modified timestamp
	webkitRelativePath,		// a string; this is usually empty
	type,					// a string; contains the file type
	size
 },
 contents					// a string; containing the actual text contents of the file if sucessful OR null on error
 error						// a string; containing an error message on error OR null on success
}
````

## Using this Class: 
- This Class is intended to be used as part of an Event Listener.
1. As Part of the Event Listener, you will need to Instantiate this Class with the optional FileTypes Array:
````javascript
    myFileReader = new EasyFileReader(["application/json" , "text/plain"])
````
2. After Instantiation, you can set a variable to be the awaited result of the "EasyFileReader.readFiles()" method. At that same time, you will also need to pass in the FileList object from the Event Listener:
````javascript
	let loadedData = await myFileReader.readFiles( event.dataTransfer.files )
````
3. Once the "EasyFileReader.readFiles()" method returns it's array of objects, you can use your variable however you see fit:
* (It does not need to be a Callback function or a 'thenable')
````javascript
	console.log( loadedData )
````

## Some Important Notes:
1: That this Class Method asyncronously returns data via await; if you don't use await, it will return undefined before the method finishes and you won't be able to access the processed data

2: If you are using "Drop" or "Drag" Event Listeners, you will need to prevent their default functionality via "event.preventDefault()". 
- This can be added to the Event Listener which calls this functionality or it can be globally prevented via "window.addEventListener".
- The implementations tools included in the companion file, "syntactic sugar.js" , handles this for you if you use them.
