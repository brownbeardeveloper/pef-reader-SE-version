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
  - Improved GUI for better accessibility.
  - Optimized for mobile view.
  - Added a Contact Us page.
  - Added a file dropzone element to the upload-file component.
  - Resolved some known issues.

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
  - Add cursive formatting (<em>) to the text.
  - Play voice when pressing the 'next page' button in the page-by-page read mode (?)
  - Send this application to the external testers.


## How to Navigate the Code

### Pages
This application contains the following pages:

- **Main page**: Includes an upload-file component, read-mode with either a "flow" component or a "page by page" component
- **Instruction page**
- **Cookie and Accessibility page**
- **Contact page**
- **404 page**

### Key Functions
- File reader**: Handles everything related to uploading files
- Folder translator**: Manages the conversion from Braille to text
- Filter sentence**: Filters out unnecessary sentences by returning null if the text consists only of specific Braille characters to skip, unless it contains certain Braille symbols to not skip
- Filter page**: Adjusts the page index to skip unnecessary pages such as those with less than a quarter of text, publisher information, or back cover text
- **Cookie manager**: Handles everything related to cookies

## Known errors

- <strike>Router didn't work properly in the Static Web App</strike> (resolved with useNavigate).
- <strike>a tags in the header could not be tabbed </strike> (resolved by using buttons instead of a tags).
- <strike>It couldn't upload files in Chrome</strike> (resolved by setting "useFsAccessApi: false" in dropzone settings).