// Make Adding Event Listeners Easier; Syntactic Sugar for Later

class EasyListener {
	constructor ( domTarget, callback){

		const selectFileTypes  = 

		this.domTarget = document.getElementById(domTarget)
		this.callback = callback
	}

	fileButtonListener = () => {
		// On "drop" Events: Read File[s], Push results to callback function, Prevent Default Behavior
		this.domTarget.addEventListener('change', async (event) => {
			//event.preventDefault(); // probably don't actually need

			//Instantiate EasyFileReader
			let myFileReader = new EasyFileReader(this.supportedFileTypes)
			
			// Await the processing of the FileList which is passed to the event listener 
			let loadedData = await myFileReader.readFiles( event.target.files ) // Eventually comes back as an Array filled with Objects
			
			// Use the resulting data in the callback function
			this.callback ( loadedData )

		}, false) 
	}

	async fileDropListener(){
		// On "dragover" Events: Prevent Default Behavior 
		this.domTarget.addEventListener("dragover", (event) => {
			event.preventDefault()
		}, false)

		// On "drop" Events: Read File[s], Push results to callback function, Prevent Default Behavior
		this.domTarget.addEventListener('drop', async (event) => {
			event.preventDefault() 

			//Instantiate EasyFileReader
			let myFileReader = new EasyFileReader(this.supportedFileTypes)
			
			// Await the processing of the FileList which is passed to the event listener 
			let loadedData = await myFileReader.readFiles( event.dataTransfer.files ) // Eventually comes back as an Array filled with Objects
			
			// Use the resulting data in the callback function
			this.callback ( loadedData )

		}, false) 
	}

}