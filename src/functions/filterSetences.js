export function filterUnnecessarySentence(txt) {

    const charsToSkip = ["⠀", "⠏", "⠉", "⠹", "⠇", "⠧", "⠤", "⠼", "⠸", "⠒"];
    const symbolsToNotSkip = ["⠼⠉", "⠼⠉⠉", "⠼⠉⠉⠉", "⠼⠉⠉⠉⠉", "⠼⠉⠉⠉⠉⠉"];

    if (txt.length === 0) {
        return null;
    }

    // Check if any part of the sentence matches any of symbolsToNotSkip
    for (const symbol of symbolsToNotSkip) {
        if (txt.includes(symbol)) {
            return txt; // Return the sentence if any symbol is found
        }
    }


    // Check each character in the row
    for (let i = 0; i < txt.length; i++) {
        if (!charsToSkip.includes(txt[i])) {
            return txt; // If any character is not in charsToSkip, return true
        }
    }

    // If whole sentence doesnt contains important information then returns null
    console.log(txt)
    return null;
}
