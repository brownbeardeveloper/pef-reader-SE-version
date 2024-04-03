import { mapBrailleToAlpha } from "../data/MapBrailleToSwedishCharacters.js";

/**
 * Converts a braille character to a letter.
 * 
 * @param {string} brailleChar - The braille symbol to be converted.
 * @returns {string|undefined} - A letter if found, otherwise undefined.
 */
export default function brailleCharToLetter(brailleChar) {
    return mapBrailleToAlpha[brailleChar]
}