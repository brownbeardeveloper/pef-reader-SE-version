import { mapBrailleToPunctuation } from "../../data/MapBrailleToSwedishCharacters.js";

/**
 * Convert braille character to punctuation.
 * @param {string} brailleChar - The Braille character to be converted.
 * @returns {string|undefined} A punctuation if found, otherwise undefined.
 */
export default function brailleCharToPunctuation(brailleChar) {
    return mapBrailleToPunctuation[brailleChar];
}
