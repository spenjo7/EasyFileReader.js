// DOCUMENTATION: The "EasyListener" class
//
// Purpose: This Class is an optional companion to the "EasyFileReader" class
//  which facilitates the implementation of the "EasyFileReader" class.
//  Specifically, it making it easy to tie specific HTML elements and 
//  JavaScript Callback functions to the "EasyFileReader" file reading finctionality.
//  to the ".readFiles()" method
//
// Input Parameters: This Class takes in 2 mandatory inputs upon Instantiation.
//   - (Mandatory) A string containing the "id" value of an HTML element which is to be the
//     target of the event listener.
//      
//   - (Mandatory) A JavaScript Callback function. 
//      -- This Callback funcation can either anonymously declared or a named function can be referenced.
//
// Useable Methods: This Class has two useable methods. These methods are fairly similar, however
//  one is for input buttons HTML elements and the other is for any HTML element which you might want
//  to drag the files onto. Neither of these methods require any input parameters. Additionally, the desired
//  method should be called immediatly upon instantiation.  
//   - fileButtonListener()
//      -- This method can be tied to <input type="file"> HTML elements only.
//
//   - fileDropListener()
//      -- This method can be tied to most HTML elements (though <div> or <textarea> are the most likely uses).     
//        
// Output Data: The data from "EasyFileReader.fileRead()" comes in the form of an array filled with objects.
//  This data is pushed directly to the callback function, which may alter the results further.
//
// Using this Class: This class uses the 'id' of an HTML element and a JavaScript Callback function.
//   - Place your HTML element and make sure that it has a unique 'id' value
//
//         ex: <div id="drop_zone">Drop files here</div>
//
//   - Define a Callback function (which takes the returned data as an argument)
//       
//          ex: myCallback = ( dataArray ) => { 
//                  dataArray.forEach( fileData => console.log(fileData) );
//              }
//
//   - Instanitate the Class with the "id" of your HTML target element and your JavaScript callback functions as
//      arguments. Additionally, call the desired method (as described above) at the same time. 
//
//          ex: new EasyListener("drop_zone", myCallback).fileDropListener();