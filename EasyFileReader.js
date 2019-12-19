// For Documentation on this the "EasyFileReader" class, look at the "EasyFileReader.md" file

class EasyFileReader {
    constructor ( allowedFileTypes){
        this.allowedFileTypes = allowedFileTypes;
    }

    // This is the Main function that will be externally used
    readFiles = ( fileList ) => {  // rename later
        
        return new Promise ( resolve => {
    
            let promiseList = Object.values( fileList )
            .filter( fileObj => typeof fileObj !== "number" ) // Generally the last value is the "length, but just in case we can filter it out by type"
            .map( thisfile => { // Map each File's data to a unique promise
    
               let fileMetadata = this.getFileMetadata( thisfile );
    
               return new Promise( resolve => {
    
                    // Send back an Object with the File Contents or an Error; either have the File Metadata included
                    if( this.verifyAllowedFileType( fileMetadata.type ) ){ // Check if valid file type and proceed accordingly
    
                        resolve( this.readSingleFiles( thisfile , fileMetadata ) );
                    
                    } else {

                        resolve( { metadata: fileMetadata , contents: null, error: `Error: '${fileMetadata.name}' has unsupported file type '${fileMetadata.type}'`} ); 
                    
                    }
                    
                }); // end of individual promise
                    
            }); // end mapping the promises 
    
            // Now resolve all of the Promises at the same time 
            Promise.all(promiseList).then( fileData => {
                resolve( fileData );
            });
    
        });
    
    };

    readSingleFiles = ( singleFile, fileMetadata ) => { 

        return new Promise( resolve => {
            let reader = new FileReader();
            
            reader.onloadend = function(e){
    
                // this is where we take the contents string and add it to the metadata to get a file object  
                let fileContents = e.target.result;
                let outputFileObject = {
                    metadata:fileMetadata,
                    contents: fileContents,
                    error: null
                }
    
                resolve( outputFileObject );
            };
                
            reader.readAsText( singleFile );
        });
        
    };

    getFileMetadata = ( fileObject) => {
        // This Re-Structures the File's Metadata and sends it back; this due to File Objects having some slight differences from what we need
    
        let {name, lastModified, lastModifiedDate, webkitRelativePath, type, size} = fileObject; // Manually destructure the File Object
        let metadata = {name, lastModified, lastModifiedDate, webkitRelativePath, type, size}; // Manually Re-Structuring a new Object
        return metadata; // send the Re-Strucured Data back
    
    };
    

    verifyAllowedFileType = (thisFileType) =>{
        // This checks to see if the File is allowed to be processed based on this file's type and the allowed file types (if applicable)
    
        return (!this.allowedFileTypes)? 
            true:   //No File Type Restrictions Exist
            (this.allowedFileTypes && this.allowedFileTypes.includes(thisFileType) )? 
            true:   // File Type Restrictions Exist, and this File is of an Allowed Type
            false;  // File Type Restrictions Exist, but this File is not of an Allowed Type
    };

} // end Easy File Reader Class