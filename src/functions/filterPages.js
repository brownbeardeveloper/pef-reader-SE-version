import { checkIfTagExistInTxt } from "./checkIfTagExistInTxt";

export function filterUnnecessaryPage(page, pageIndex, nextPage) {

    const textToSkip = ["⠞⠗⠽⠉⠅⠥⠏⠏⠛⠊⠋⠞⠑⠗", "⠃⠁⠅⠎⠊⠙⠑⠎⠞⠑⠭⠞"];
    const tagOfTheEnd = ["⠀", "⠒"];

    if (page.rows[0].includes("⠞⠗⠽⠉⠅⠥⠏⠏⠛⠊⠋⠞⠑⠗") || page.rows[0].includes("⠃⠁⠅⠎⠊⠙⠑⠎⠞⠑⠭⠞")) {
        
        console.log("founded txt to skip.. page index and row length", pageIndex, page.rows.length)

        const lastRow = page.rows[page.rows.length-1]
        for (let i = 0; i < lastRow.length; i++) {
            if (!tagOfTheEnd.includes(lastRow[i])) {

                if (nextPage && nextPage.rows) {

                    const lastRowNextPage = nextPage.rows[nextPage.rows.length-1]
                    console.log("check if the last row in next page is not undefined", lastRowNextPage)
        
                    for (let j = 0; j < lastRowNextPage.length; j++) {
                        if (!"⠀" === lastRowNextPage[j] || !"⠒" === lastRowNextPage[j]) {
                            console.log("last row in the next page doesn't contain tag of the end.. char:", lastRowNextPage[j])
                            return page
                        } 
                    }
                    return null
                } 

                console.log("last row in this page doesn't contain tag of the end.. char:", lastRow[i])
                return page
            } 
        }

        return null
    }
    return page
}

export function checkIfNecessaryPage(page) {

    const firstRow = page.rows[0]
    const tags = ["⠞⠗⠽⠉⠅⠥⠏⠏⠛⠊⠋⠞⠑⠗", "⠃⠁⠅⠎⠊⠙⠑⠎⠞⠑⠭⠞"]

    if(checkIfTagExistInTxt(tags, firstRow)) {
        
        const lastRow = page.rows[page.rows.length-1]
        const tagOfTheEnd = ["⠀", "⠒"];

        for (let i = 0; i < lastRow.length; i++) {
            if (!tagOfTheEnd.includes(lastRow[i])) {

                if (nextPage && nextPage.rows) {

                    const lastRowNextPage = nextPage.rows[nextPage.rows.length-1]
                    console.log("check if the last row in next page is not undefined", lastRowNextPage)
        
                    for (let j = 0; j < lastRowNextPage.length; j++) {
                        if (!"⠀" === lastRowNextPage[j] || !"⠒" === lastRowNextPage[j]) {
                            console.log("last row in the next page doesn't contain tag of the end.. char:", lastRowNextPage[j])
                            return page
                        } 
                    }
                    return null
                } 

                console.log("last row in this page doesn't contain tag of the end.. char:", lastRow[i])
                return page
            } 
        }

        return null
    }
    return page
}
