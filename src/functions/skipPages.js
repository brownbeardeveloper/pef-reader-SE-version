export function filterUnnecessarySentence(sentence) {

    const charsToSkip = ["⠀", "⠏", "⠉", "⠹", "⠇", "⠧", "⠤", "⠼", "⠸", "⠒"];
    const symbolsToNotSkip = ["⠼⠉", "⠼⠉⠉", "⠼⠉⠉⠉", "⠼⠉⠉⠉⠉", "⠼⠉⠉⠉⠉⠉"];

    if (sentence.length === 0) {
        return null;
    }

    // Check if any part of the sentence matches any of symbolsToNotSkip
    for (const symbol of symbolsToNotSkip) {
        if (sentence.includes(symbol)) {
            return sentence; // Return the sentence if any symbol is found
        }
    }


    // Check each character in the row
    for (let i = 0; i < sentence.length; i++) {
        if (!charsToSkip.includes(sentence[i])) {
            return sentence; // If any character is not in charsToSkip, return true
        }
    }

    // If whole sentence doesnt contains important information then returns null
    console.log(sentence)
    return null;
}
