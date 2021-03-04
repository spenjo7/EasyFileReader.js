class EasyListener {
	constructor (  callback, allowedCategories = null ){
		this.EFR = new EasyFileReader()
		this.allowedCategories = allowedCategories?? null 
		
		/*
		this.domTarget = (domTarget instanceof HTMLElement)? domTarget
			: ( typeof domTarget === 'string' )? document.getElementById(domTarget)?? null : null
		*/

		this.callback = callback?? (() => { console.debug('No Callback Function has been set for this File Button Listener!') }) 
	}

	verifyDomTarget(target){
		return (target instanceof HTMLElement)? target
			: ( typeof target === 'string' )? document.getElementById(target)?? null : null
	}

	fileDropListener( domTarget ){
		const target = this.verifyDomTarget(domTarget)
		if(!target){ 
			console.debug('fileButtonListener was not assinged a valid target element')
			return null 
		}

		// On "dragover" Events: Prevent Default Behavior 
		target.addEventListener("dragover", (event) => {
			event.preventDefault()
		}, false)

		// On "drop" Events: Read File[s], Push results to callback function, Prevent Default Behavior
		target.addEventListener('drop', async (event) => {
			event.preventDefault() 
			
			// Await the processing of the FileList which is passed to the event listener 
			let loadedData = await this.EFR.readFiles( event.dataTransfer.files, this.allowedCategories ) // Eventually comes back as an Array filled with Objects
			
			// Use the resulting data in the callback function
			this.callback ( loadedData )

		}, false)
		return this 
	}

	fileButtonListener( domTarget ){
		const target = this.verifyDomTarget(domTarget)
		if(!target){ 
			console.debug('fileButtonListener was not assinged a valid target element')
			return null 
		}

		target.addEventListener('change', async (event) => {
			//event.preventDefault(); // probably don't actually need
			
			// Await the processing of the FileList which is passed to the event listener 
			let loadedData = await this.EFR.readFiles( event.target.files, this.allowedCategories ) // Eventually comes back as an Array filled with Objects
			
			// Use the resulting data in the callback function
			this.callback( loadedData )

		}, false)
		return this  
	}
}