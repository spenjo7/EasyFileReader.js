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
 category,		// a string; consisting of the file's "category" as determined by it's mime-type 
 encoded, 		// a string; consisting of the base64 encoded contents of the file
 err,			// a string; consisting of an error message on error OR null on success
 lastModified,	// a number; consisting of the last modified timestamp in miliseconds ( from epoch )
 name,			// a string; consisting of the file's name
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