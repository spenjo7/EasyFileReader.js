// For Documentation on this the "EasyFileReader" class, look at the "EasyFileReader.md" file
class EasyFileReader {

	getFileDetails(fileObject){	// Re-Structure File's Metadata; send back with extrapolated data
		const rgx_fileExt = /[^\b](?<ext>\.[a-z\d]{1,4})\b/i 		
		const getCategoryFromType = (str,ext) => {
			const { category }  = [
				{ category: 'audio',	types: [
					'audio/mpeg',	'audio/mid'
				]},

				{ category: 'image',	types: [
					'image/bmp',	'image/gif',	'image/jpeg',	
					'image/png',	'image/svg+xml',	'image/x-icon'
				]},

				{ category: 'text',	exts: [ '.md' ], types: [
					'application/json',	'text/css',	'text/csv',
					'text/javascript',	'text/plain',	'text/html'
				]},

				{ category: 'richtext',	types: [
					'application/msword', /*doc and rtf*/	  
					'application/vnd.ms-excel',
					'application/vnd.openxmlformats-officedocument.presentationml.presentation',
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
				]},

				{ category: 'video',	types: [
					'video/avi',	'video/mp4'
				]},
				
				{ category: 'pdf',	types: [ "application/pdf" ]},

				{ category: 'compressed',	types: [ 'application/x-zip-compressed']}
			]
			.find( m => m.types.includes(str) || (m.exts && m.exts.includes(ext))) ?? {}
			return category?? null
		}

		const {name, lastModified, lastModifiedDate, type, size} = fileObject

		const fileExt = rgx_fileExt.test(name)? rgx_fileExt.exec(name).groups.ext.toLowerCase() : null
		const category = getCategoryFromType(type, fileExt)
		
		return ({ fileName: name, category, lastModified, type, size, fileExt})
	}	


	async getFileContents(file){ // Extract the text and/or encoded file data 
		const readPlaintextFile = async (file) => { 
			return new Promise( resolve => {
				const reader = new FileReader()
				reader.onloadend = function(f){
					let fileContents = f.target.result // each file has it's own target.result
					resolve(fileContents)
				}
				reader.readAsText(file)
			})
		}

		const readBase64EncodedFile = async (file) => { 
			return new Promise( resolve => {
				const reader = new FileReader()
				reader.onloadend = ((f) => {
					const encoding = f.target.result 
					resolve(encoding)	
				})
				reader.readAsDataURL(file)
			})
		}

		const plaintext = (file.details.category == 'text' )? 
			await readPlaintextFile(file) : null

		const encoded = await readBase64EncodedFile(file)
		return { plaintext, encoded } 
	}


		// Get File(s) Details then Contents; send back Array of Objects
	async readFiles(objectList, allowedCategories = null ){

		const handleFile = async (file) => {
			/*const metadata = this.getFileDetails( file )*/
			const {details} = file
			const {category} = details
			
			if(!category){ return details }
				try{
					const { plaintext, encoded }  = await this.getFileContents(file)
					return ({ ...details, plaintext, encoded })
				}
				catch(error){
					err = error
					return ({err})
				}
		} 
	
		const categoryFilter = ( currentFile ) => {
			if( !allowedCategories){ return true }
			const { category } = currentFile.details
			if( !category ){ return false }
			return allowedCategories.find( el => category === el.toLowerCase() )?
				true : false 
		}

		const fileList = Object.values( objectList )
			.filter( fileObj => typeof fileObj !== "number" )
			.map( file => {
				file.details = this.getFileDetails( file )
				return file
			})
			.filter( file =>{
				const isValid = categoryFilter(file) 
				if(!isValid){
					console.error(`${file.details.fileName} is not of an acceptable type/extention for this opperation!`)
				}
				return isValid
			})


		return Promise.all( fileList.map( file => handleFile(file) ))
	}
}