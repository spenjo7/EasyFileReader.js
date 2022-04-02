const extractFileText = async (files) => {
	let promise = new Promise((resolve) => {
		let warning = null

		if( /image/.test(files[0].type) ){
			warning = `File Type Not Supported: ${files[0].type}`
		}

		// might add more warning criteria such as prohibited files later

		if(warning){ 
			resolve(warning) 
			return null
		}
		
		let reader = new FileReader()
		
		reader.onloadend = ( e ) => {
			let text = e.target.result
			resolve(text)
		}  
		
		try{
			reader.readAsText(files[0])
		} catch( error ){
			resolve(error)
		}	
	})
	
	return promise
}

const handleFiles = async ( fileList, target = null ) => {
	let text = await extractFileText(fileList)
		
	if (!target){
		return null // do nothing
	} else if( target.tagName == "TEXTAREA" || target.tagName == "INPUT" ){
		target.value = text
	} else {
		target.innerText = text
	}
}

// Add this functionality globally
window.addEventListener("drop", (event) => {
	event.preventDefault()
	let target = event.target.closest('textarea,input[type=text],input[type=password]') 
		// bubbles to textbox
	let files = event.dataTransfer.files // FileList object	
	if(target && files ){
		handleFiles(files, target)
	}
},false)

window.addEventListener("dragover", (event) =>{
	event.preventDefault()
},false)