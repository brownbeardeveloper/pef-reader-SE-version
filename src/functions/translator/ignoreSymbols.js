import { ignoreBrailleCharacters } from "../../data/MapBrailleToSwedishCharacters.js";

/**
 * Checks if a given braille character is an ignored symbol.
 * 
 * @param {string} brailleChar - The braille symbol to be checked.
 * @returns {boolean} - True if the symbol is ignored, otherwise false.
 */
export default function isIgnoreSymbol(brailleChar) {
    return ignoreBrailleCharacters.includes(brailleChar) // returns boolean
}