# PEF-reader SE version
This repository contains code for a tool that can convert files in Portable Embosser Format (PEF), which contains braille text and can be used by blind people to read. The tool has support to download the content as HTML, or display the result directly in the browser.

## Future improvements
- [ ] Support for multiple languages
- [ ] Use liblouis as converter instead of custom

## Important links
- https://www.mtm.se/globalassets/punktskriftsnamnden/svenska_skrivregler_for_punktskrift.pdf
- https://braillespecs.github.io/pef/pef-specification.html

## Versions

### 2.0.1 (Latest Version)
  - Added voices.
  - Changed from saving the row position by clicking on it to automatically saving the page position.

### 2.0.0
  - Implemented as a React app.
  - Added Braille and black text views.
  - Implemented saving row position using cookies by book's ID.
  - Added "Instructor" and "Cookie" pages.
  - Enabled navigation with the tab key.
  
### 1.0.0 
- Initial release
  - Project created using pure JavaScript, HTML, and CSS.


## To-Do 
  - Set focus on the page header index when changing the page index.