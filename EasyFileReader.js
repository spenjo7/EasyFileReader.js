// For Documentation on this the "EasyFileReader" class, look at the "EasyFileReader.md" file
class EasyFileReader {

	getReftypes(){ // used for several other methods
		return [
			{
				category: 'audio',
				types: [
					'audio/mpeg',
					'audio/mid'
				]
			},
			{
				category: 'image',
				types: [
					'image/bmp',
					'image/gif',
					'image/jpeg',
					'image/png',
					'image/svg+xml',
					'image/x-icon'
				]
			},
			{
				category: 'text',
				types: [
					'application/json',
					'text/css',
					'text/csv',
					'text/javascript',
					'text/plain',
					'text/html'
				],
				exts: [ '.md' ]
			},
			{
				category: 'richText',
				types: [
					'application/msword',       // .doc and .rtf 
					'application/vnd.ms-excel',
					'application/vnd.openxmlformats-officedocument.presentationml.presentation',
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
				]
			},
			{
				category: 'video',
				types: [
					'video/avi',
					'video/mp4'
				]
			},
			{
				category: 'pdf',
				types: [ 
					"application/pdf"
				]
			},
			{
				category: 'compressed',
				types: [
					'application/x-zip-compressed'
				]
			}
		]
	}

	getCategoryFromType(str,ext){
		const { category }  = this.getReftypes()
			.find( m => m.types.includes(str) || (m.exts && m.exts.includes(ext))) ?? {}
		return category?? null
	}


	async readFiles(objectList){ 
		
		const fileList = Object.values( objectList )
			.filter( fileObj => typeof fileObj !== "number" ) 

			const handleFile = async (file) => {
				const metadata = await this.getFileMetadata( file )
				const {category} = metadata
				let err = null
				let plaintext = null
				let encoded = null
				if(category){
					try{
						let readResults = await this.getContents(file, category)
						plaintext = await readResults.plaintext?? null
						encoded =  await readResults.encoded ?? null
					}
					catch(error){
						err = error
					}
				}

				const output = { ...metadata, plaintext, encoded, err }
				return await output
			} 

			return Promise.all( fileList.map( file => handleFile(file) ))
	}

	async getContents(file, category){
		const plaintext = (category == 'text')? 
			await this.readPlaintextFile(file)
			: null

		const encoded = await this.readBase64EncodedFile(file)
		
		return { plaintext, encoded } 
	}

	async readPlaintextFile(file){ 
		return new Promise( resolve => {
			const reader = new FileReader()
			reader.onloadend = function(f){
				let fileContents = f.target.result
				resolve(fileContents)
			}
			reader.readAsText(file)
		})
	}

	async readBase64EncodedFile(file){ 
		return new Promise( resolve => {
			const reader = new FileReader()
			reader.onloadend = ((f) => {
				const encoding = f.target.result // each file has it's own target.result
				resolve(encoding)	
			})
			reader.readAsDataURL(file)
		})
	}

	async getFileMetadata(fileObject){
		// This Re-Structures the File's Metadata and sends it back; this due to File Objects having some slight differences from what we need
		const {name, lastModified, lastModifiedDate, type, size} = fileObject // Manually destructure the File Object
		const rgx_fileExt = /[^\b](?<ext>\.[a-z\d]{1,4})\b/i 
		const match = rgx_fileExt.test(name)? rgx_fileExt.exec(name) : null
		const fileExt = match? match.groups.ext.toLowerCase() : null 

		const category = this.getCategoryFromType(type, fileExt)
		
		const metadata = { fileName: name, category, lastModified, type, size, fileExt} // Manually Re-Structuring a new Object
		return metadata // send the Re-Strucured Data back
	}	
}