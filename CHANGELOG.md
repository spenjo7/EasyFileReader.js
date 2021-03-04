# Change Log

## [2.1.0] 2021-03-03 - Expanded Features

### Added:
+ EasyListener.js - Instead of the old acceptedFileTypes array, an optional file category filter can be used
++ This is done through a secondary argument which is an array of acceptable categories
+++ Files from invalid categories will throw a console error but not interupt any other functions

### Changed: 
- EasyFileReader.js 
+ Now uses regular expressions to try to determine a files extention
-- The extracted file extention is passed along with the metadata as the 'fileExt' attribute
-- The extracted file extention can be used as a backup for files with no discernable 'type' ( ex: .MD files like this one) 
-- The 'name' attribute from the file metadata has been changed to the 'filename' attribute because this is more in line with what people would expect
+ Additional internal reshuffling occured to clean things up, but nothing that should affect functionality


- EasyListener.js - Now can accept an HTMLdom Element directly OR a string (as before)
-- Will logic check the provided value to determine which applies

- Index.html - (The non-essential example file) - Has been expanded to preview all sorts of files, not just images
-- This may get added to the EasyListener, which itself may be expanded to generate forms and previews



## [2.0.0] 2021-03-01 - Massive Refactor

### Added:
- CHANGELOG.md

### Changed
- EasyFileReader.js - No Longer takes in an acceptedFileTypes array
- Now it now tries to determine what 'category' each file is based on it's file.metadata.type
-- The list of suported files categories is a work in progress
-- Image and video files now return their base64 encoding contents as a 'content' attribute
--- Images can easily be rendered into a new \<img> element

- Cleaning up some of the documentation
-- The individual MD files have been moved into README.md
