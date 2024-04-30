import { doesThisPageContainLessThanQuarterText } from "./translator/skipFirstPage";

export function manipulatePageIndexToRemoveUnnecessaryPages(pages, pageIndex) {

    const endOfPageToSkipRegEx = new RegExp("[⠀,⠒]+$")
    const textToSkip = ["⠞⠗⠽⠉⠅⠥⠏⠏⠛⠊⠋⠞⠑⠗", "⠃⠁⠅⠎⠊⠙⠑⠎⠞⠑⠭⠞"];
    const isFirstRowSkippable = textToSkip.some(text => pages[pageIndex].rows[0].includes(text));

    /* Remove the first pages in every volume */
    if (pageIndex === 0 && doesThisPageContainLessThanQuarterText(pages[pageIndex])) {
        console.log("This page is removed", pages[pageIndex])
        pageIndex++
    }

    if (isFirstRowSkippable) {

        const lastRow = (pages[pageIndex] && pages[pageIndex].rows) ? pages[pageIndex].rows[pages[pageIndex].rows.length-1] : null

        const nextPage = (pageIndex + 1 < pages.length) ? pages[pageIndex + 1] : null

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