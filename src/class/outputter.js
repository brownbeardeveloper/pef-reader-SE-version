import { OutputFormats } from "../data/format.js";

class Outputter {

    /*
        Parameters:
            outputFormat <String>: Output formatter, as String, eg: "HTML"
        Returns:
            <OutputFormatter>: Subclass of OutputFormatter
    */
    static getOutputFormatter(outputFormat) {
        if (outputFormat.toUpperCase() == OutputFormats.HTML)
            return OutputFormatter;
        else
            throw new Error(`Failed to recognize output format ${outputFormat}`);
    }

    /*
        Parameters:
            pefObject <Pef>
            outputFormat <String> What output format we want (as string), eg 'HTML'
        Returns:
            <String>: Formatted output text
    */
    static format(pefObject, outputFormat) {
        let outputFormatter = Outputter.getOutputFormatter(outputFormat);
        let output = '';

        let pNbr = 0
        for (let [volumes_i, volume] of pefObject.body.volumes.entries()) {
            output += outputFormatter.formatVolumeStart(volumes_i);
            let select = document.getElementById("volumejumper")
            let option = document.createElement("option")
            option.text = "" + (volumes_i+1);
            option.value = "vol"+volumes_i;
            select.appendChild(option)
            
            for (let [section_i, section] of volume.sections.entries()) {
                output += outputFormatter.formatSectionStart();
                for (let [page_i, page] of section.pages.entries()) {

                    // output += '<span id = "checkpoint' + page_i + '" tabindex=0>';
                    /*output += '<span id="checkpoint_'+ page_i + '" class="checkpoint"'
                        + 'style="white-space:nowrap" tabindex=0></span>';*/
                    let p = this.formatPage(page, outputFormatter, pNbr)
                    pNbr += p.pageNbr > 0 ? 1 : 0;
                    output += p.pageNbr > 0 ? "<span tabindex = -1 id ='page"+ pNbr +"' >" : "<span>"
                    output += p.page;
                    output += "</span>"

                    if (p.toc != null){
                        let tocSel = document.getElementById("toc")
                        p.toc.forEach((e) => {
                            let tocOption = document.createElement("option")
                            tocOption.text = e.title
                            tocOption.value = "page"+e.paNbr;
                            tocSel.appendChild(tocOption)
                        });
                    }
                    // output += '</span>'

                }
                output += outputFormatter.formatSectionEnd();
            }
            output += outputFormatter.formatVolumeEnd();
        }
        // output += "<span id='jump_to_this_location'>Jump here!</span>";
        return output;
    }
    
    static foundContents = 0;
    static stopLooking = false
    static contentPages = []
    static standardParagraph = false
    /**
     * 
     * @param {*} page 
     * @param {*} outputFormatter 
     * @returns object with page text and page nbr
     */
    static formatPage(page, outputFormatter, notInlSid) {
        let newPage = ''
        // newPage += outputFormatter.formatPageStart();
        let pageRows = page.rows.entries();
        let pageNbr = -1;
        let prevRow = '';
        let prevRowHadhypen = false;


        let tableOfContentString = "";

        for (let [row_i, row] of pageRows) {
            if (row_i == 0){
                let str = row.replace(/\s+/g, '');
                pageNbr = parseInt(str);
                pageNbr = !isNaN(pageNbr) ? pageNbr : -1;
            }

            // page number row will not be added to normal page text
            // special page numbers like roman numerals will be added however
            // as well as first rows not containing page numbers
            let isBlankRow = row === 'PEFBLANKROW'.replace(/\s+/g, '');
            if (isBlankRow){
                newPage += '<br>';
            }
            else if (pageNbr < 0 || this.standardParagraph){
                if (row_i != 0){
                    newPage += outputFormatter.formatRowStart();
                newPage += row;
                newPage += outputFormatter.formatRowEnd();
                }
                
                tableOfContentString += row.trim() + "\n";
            }
            else if (row_i !== 0) {
           
                //newPage += outputFormatter.formatRowStart();
                let shouldDeleteSpaces = prevRowHadhypen;
                let hyphenFound = hasHyphen(row);
                row = hyphenFound ? taBortAvstavning(row) : row;
                prevRowHadhypen = hyphenFound;
                let nbrOfSpaces = countSpaces(row);
                let lineBreak = nbrOfSpaces > countSpaces(prevRow) && prevRow !== '';
                prevRow = row;
                row = shouldDeleteSpaces ? row.substring(nbrOfSpaces) : row;
                
                if (lineBreak){
                    newPage += '<br>&ensp;' + row;
                }
                else{
                    // row = row.charAt(0) == " " ? row.substring(2) : row;

                    newPage += row;
                }
                //newPage += outputFormatter.formatRowEnd();
            }
        }
        // newPage += outputFormatter.formatPageEnd();

        if (notInlSid <= 0){
            // console.log(tableOfContentString)
            let tableOfContents = tableOfContent(tableOfContentString);
            // tableOfContents.forEach((title,paNbr) => {
            //     console.log(title)
            //     console.log(paNbr)
            // });
            return {page: newPage, pageNbr: pageNbr, toc: tableOfContents};
        }
            

        return {page: newPage, pageNbr: pageNbr, toc: null};

    }

    /*
        Parameters:
            metaData <Meta>
            outputFormat <String> What output format we want (as string), eg 'HTML'
        Returns:
            <String>: Formatted first page
    */
    static formatFirstPage(metaData, outputFormat, addTitle = true) {
        this.standardParagraph = false;
        let outputFormatter = Outputter.getOutputFormatter(outputFormat);

        let output = '';
        let otherMetaData = new Map();

        for (const [key, value] of Object.entries(metaData)) {
            switch (key) {
                case 'title':
                    output += addTitle ? outputFormatter.formatFirstPageTitleStart() +
                              value +
                              outputFormatter.formatFirstPageTitleEnd() : '<h1 class = "normalH1">'+value+'</h1>';
                break;
                case 'creator':
                    output += outputFormatter.formatFirstPageAuthorStart() +
                              value +
                              outputFormatter.formatFirstPageAuthorEnd();
                    break;
                case 'date':
                    output += outputFormatter.formatFirstPageDateStart() +
                              value +
                              outputFormatter.formatFirstPageDateEnd();
                    break;
                default:
                    // If the value for the given meta data exists, we'll save it
                    // for now so we can add it to the front page so it comes after title/creator/date.
                    if (value) {
                        otherMetaData.set(key, value);
                    }
                    break;
            }
        }

        let addedMetadataTable = false;

        for (const [key, value] of otherMetaData.entries()) {
            if (!addedMetadataTable) {
                // Let's append a metadata table
                output += outputFormatter.firstPageMetaDataTableStart();
                addedMetadataTable = true;
            }

            let nyckel = key;
            let skippa = false;

            switch (key){
                case 'identifier':
                    nyckel = 'identifierare';
                    break;
                case 'description':
                    nyckel = 'beskrivning';
                    break;
                case 'publisher':
                    nyckel = 'utgivare';
                    break;
                case 'type':
                    nyckel = 'ämneskod (SAB)'
                    if (value.includes('H') && value.includes('.03')){
                        this.standardParagraph = true; //hack för att få punktskriftsrader vid poesi
                    }
                    break;
                case 'source':
                    skippa = true;
                    break;
                case 'format':
                    skippa = true;
                    break;
                case 'language':
                    nyckel = 'språk';
                    break;

                case 'contributor':
                    nyckel = 'medverkande';
                    break;
                
            }

            output += !skippa ? outputFormatter.formatFirstPageMetaKeyStart() +
                      nyckel +
                      outputFormatter.formatFirstPageMetaKeyEnd() +
                      outputFormatter.formatFirstPageMetaValueStart() +
                      value +
                      outputFormatter.formatFirstPageMetaValueEnd() : "";
        }

        if (addedMetadataTable) {
            output += outputFormatter.firstPageMetaDataTableEnd();
        }


        return output;
    }

}

//helper functions

function tableOfContent(str) {
    const toc = str;
    const pattern = /\d+$/gm;
    
    let chapters = [];
    
    let match;

    let prevInd = 0
    while ((match = pattern.exec(toc)) !== null) {
        //console.log(match)
        let text = toc.substring(prevInd, match.index)
        prevInd = match.index + match[0].length
        //console.log(text)
        //console.log(parseInt(match[0]))

        if (text.toUpperCase().includes("VOLYM")){
            let foundIndex = text.toUpperCase().indexOf("VOLYM");
            let afterVol = text.substring(foundIndex)
            text = afterVol
       }

        if (text.toUpperCase().includes("SKRIFTSBOKEN STÅR INOM")){
            let foundIndex = text.toUpperCase().indexOf("SKRIFTSBOKEN STÅR INOM");
            let afterVol = text.substring(foundIndex+33)
            text = afterVol
        }

        let dotIncluded= false;
        while (text.includes('.')){
            dotIncluded = true;
            text = text.replace('.', '')
        }
        // if (!text.toUpperCase().includes("VOLYM")){
        if (dotIncluded){
            chapters.push({title: text, paNbr: parseInt(match[0])})


        }
        // }
    //   const title = match[1].trim();
    //   const endPage = parseInt(match[2]);
    //   chapters.push({ title, endPage });
    }
    return chapters;
    // console.log(chapters);
}
function hasHyphen(str){
    let index = str.length-1;
    let letter = str.charAt(index);
    let hasHyphen= false;
    while(letter === ' ' || letter === '-'){
        hasHyphen = letter === '-';
        index--;
        letter = str.charAt(index);
    }
    return hasHyphen;
}

function taBortAvstavning(str){
    let index = str.length-1;
    let letter = str.charAt(index);
    while(letter === ' ' || letter === '-'){
        str = str.substring(0, index);
        index--;
        letter = str.charAt(index);
    }
    return str;
}

function countSpaces(str){
    let letter = str.charAt(0);
    let count = 0;
    while (letter === ' '){
        count++;
        letter = str.charAt(count);
    }
    return count;
}


export { Outputter, OutputFormats };