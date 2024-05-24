import { filterUnnecessarySentence } from "../filterSetences";

export function doesThisPageContainLessThanQuarterText(page) {
    let counter = 0

    /* Check every row for text and returns null if not necessary text */
    page.rows.forEach(row => {
        if(filterUnnecessarySentence(row)) {
            counter++
        }
    });

    if(counter/page.rows.length < 0.25) {
        return true
    } else {
        return false
    }
}