export function manipulatePageIndexToRemoveUnnecessaryPages(page, index, nextPage) { // delete pageIndex later

    const endOfPageToSkipRegEx = new RegExp("[⠀,⠒]+$")
    const textToSkip = ["⠞⠗⠽⠉⠅⠥⠏⠏⠛⠊⠋⠞⠑⠗", "⠃⠁⠅⠎⠊⠙⠑⠎⠞⠑⠭⠞"];
    const isFirstRowSkippable = textToSkip.some(text => page.rows[0].includes(text));

    if (isFirstRowSkippable) {
        
        console.log("founded txt to skip.. page index and row length", index, page.rows.length)
        const lastRow = (page && page.rows) ? page.rows[page.rows.length-1] : null
        const lastRowNextPage = (nextPage && nextPage.rows) ? nextPage.rows[nextPage.rows.length-1] : null

        if (lastRow && endOfPageToSkipRegEx.test(lastRow)) {
            return 1
        } else if (lastRowNextPage && endOfPageToSkipRegEx.test(lastRowNextPage)) {
            return 2
        }
    }
    return 0
}