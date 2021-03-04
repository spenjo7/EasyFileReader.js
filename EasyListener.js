class EasyListener {
	constructor ( domTarget, callback, allowedCategories = null ){
		this.EFR = new EasyFileReader()
		this.allowedCategories = allowedCategories?? null 
		this.domTarget = (domTarget instanceof HTMLElement)? domTarget
			: ( typeof domTarget === 'string' )? document.getElementById(domTarget)?? null : null

		this.callback = callback?? (() => { console.debug('No Callback Function has been set for this File Button Listener!') }) 
	}

	fileButtonListener = ( _callback = null, _allowedCategories = null ) => {
		// On "drop" Events: Read File[s], Push results to callback function, Prevent Default Behavior
		const _clbk = _callback?? this.callback
		const _cats = _allowedCategories?? this.allowedCategories?? null 

		this.domTarget.addEventListener('change', async (event) => {
			//event.preventDefault(); // probably don't actually need
			
			// Await the processing of the FileList which is passed to the event listener 
			let loadedData = await this.EFR.readFiles( event.target.files, _cats ) // Eventually comes back as an Array filled with Objects
			
			// Use the resulting data in the callback function
			_clbk( loadedData )

		}, false) 
	}

	async fileDropListener( _callback = null, _allowedCategories = null ){
		const _clbk = _callback?? this.callback
		const _cats = _allowedCategories?? this.allowedCategories?? null 
		
		// On "dragover" Events: Prevent Default Behavior 
		this.domTarget.addEventListener("dragover", (event) => {
			event.preventDefault()
		}, false)

		// On "drop" Events: Read File[s], Push results to callback function, Prevent Default Behavior
		this.domTarget.addEventListener('drop', async (event) => {
			event.preventDefault() 
			
			// Await the processing of the FileList which is passed to the event listener 
			let loadedData = await this.EFR.readFiles( event.dataTransfer.files, _cats ) // Eventually comes back as an Array filled with Objects
			
			// Use the resulting data in the callback function
			this.callback ( loadedData )

		}, false) 
	}

}