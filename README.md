# PEF-reader SE version
This application is designed to make it easier for users, with or without visual impairments, to access braille books digitally and read them directly in the web browser with the assistance of a refreshable braille display.

## Future improvements
- [ ] Support for multiple languages
- [ ] Use liblouis as converter instead of custom

## Important links
- https://www.mtm.se/globalassets/punktskriftsnamnden/svenska_skrivregler_for_punktskrift.pdf
- https://braillespecs.github.io/pef/pef-specification.html

## Versions

### 2.0.1 (Latest Version)
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
  - Remove hyphenation as the last character in flow read-mode.
  - Add cursive formatting (<em>) to the text.
  - Adjust the GUI for a browser window zoomed to 200%.
  - Send this application to the external testers.
  - Add voice when pressing the 'next page' button in the read-mode.


## How to Navigate the Code

### Pages
This application contains the following pages:

- **Main page**: Includes an upload-file component, read-mode with either a "flow" component or a "page by page" component
- **Instruction page**
- **Cookie and Accessibility page**
- **Contact page**
- **404 page**

### Key Functions
- **File reader**: Handles everything related to uploading files
- **Folder translator**: Manages the conversion from Braille to text
- **Filter sentence**: Filters out unnecessary sentences by returning null if the text consists only of specific Braille characters to skip, unless it contains certain Braille symbols to not skip
- **Filter page**: Adjusts the page index to skip unnecessary pages such as those with less than a quarter of text, publisher information, or back cover text
- **Cookie manager**: Handles everything related to cookies



