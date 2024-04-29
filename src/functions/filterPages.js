import { doesThisPageContainLessThanQuarterText } from "./translator/skipFirstPage";

export function manipulatePageIndexToRemoveUnnecessaryPages(page, pageIndex, nextPage) {

    const endOfPageToSkipRegEx = new RegExp("[⠀,⠒]+$")
    const textToSkip = ["⠞⠗⠽⠉⠅⠥⠏⠏⠛⠊⠋⠞⠑⠗", "⠃⠁⠅⠎⠊⠙⠑⠎⠞⠑⠭⠞"];
    const isFirstRowSkippable = textToSkip.some(text => page.rows[0].includes(text));

    /* Remove the first pages in every volume */
    if (pageIndex === 0 && doesThisPageContainLessThanQuarterText(page)) {
        console.log("This page is removed", page)
        pageIndex++
    }

    if (isFirstRowSkippable) {

        const lastRow = (page && page.rows) ? page.rows[page.rows.length-1] : null
        const lastRowNextPage = (nextPage && nextPage.rows) ? nextPage.rows[nextPage.rows.length-1] : null

        /* Check if there's one or two unnecessary pages */
        if (lastRow && endOfPageToSkipRegEx.test(lastRow)) {
            pageIndex++
        } else if (lastRowNextPage && endOfPageToSkipRegEx.test(lastRowNextPage)) {
            return pageIndex+2
        }
    }
    return pageIndex
}