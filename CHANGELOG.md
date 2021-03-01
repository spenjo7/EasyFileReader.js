# Change Log

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