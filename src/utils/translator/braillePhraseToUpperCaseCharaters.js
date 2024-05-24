import brailleCharToLetter from "./brailleCharToLetter.js";
import brailleCharToPunctuation from "./brailleCharToPunctuation.js"; 
import { upperCaseSign, stopSign, blankSign } from "../../data/MapBrailleToSwedishCharacters.js";

/**
 * Converts a part of Braille text to uppercase.
 * @param {string} braillePhrase - The Braille text to be converted.
 * @param {number} currentIndex - The current index in the Braille text.
 * @returns {string|undefined} The converted uppercase text if found, otherwise undefined.
 */
export default function braillePhraseToUpperCaseCharacters(braillePhrase, currentIndex) {

    const maxIndex = braillePhrase.length;
    let stringBuilder = '';

    // Check if the current character isn't a Braille upperCaseSign.
    if (braillePhrase.charAt(currentIndex) !== upperCaseSign) return undefined;

    // Check if the first letter should be uppercase.
    if (braillePhrase.charAt(currentIndex + 1) !== upperCaseSign) {
        return brailleCharToLetter(braillePhrase.charAt(currentIndex + 1)).toUpperCase();
    }

    // Check if the whole word should be uppercase.
    if (braillePhrase.charAt(currentIndex + 2) !== upperCaseSign) {

        for (let i = currentIndex + 2; i < maxIndex; i++) {

            const convertedChar = brailleCharToLetter(braillePhrase.charAt(i));

            if (!convertedChar) {
                break;
            } else {
                stringBuilder += convertedChar;
            }
        }
        return stringBuilder.toUpperCase();
    }

    // Convert all letters to uppercase until the stop sign.
    for (let i = currentIndex + 3; i < maxIndex; i++) {

        const currentChar = braillePhrase.charAt(i);
        const nextChar = braillePhrase.charAt(i + 1);
        let charPlaceholder;

        if (currentChar === stopSign) { 
            break; 
        }

        charPlaceholder = ((currentChar === blankSign) ? ' ' : undefined ) ||
            brailleCharToLetter(currentChar) ||
            brailleCharToPunctuation(currentChar + nextChar) ||
            brailleCharToPunctuation(currentChar);

        stringBuilder += charPlaceholder || currentChar;
    }

    return stringBuilder.toUpperCase();
}
