import { mapBrailleToNumber, numberSign, stopSign } from "../data/MapBrailleToSwedishCharacters.js";

/**
 * Converts a part of Braille text to a number.
 * @param {string} braillePhrase - The Braille text to be converted.
 * @param {number} currentIndex - The current index in the Braille text.
 * @returns {string|undefined} The converted number if found, otherwise undefined.
 * 
 */
export default function braillePhraseToNumber(braillePhrase, currentIndex) {

    // Check if the current character is a number sign
    if (braillePhrase.charAt(currentIndex) === numberSign) {

        let numberString = ""

        for (let i = currentIndex + 1; i < braillePhrase.length; i++) {

            let currentChar = braillePhrase.charAt(i)

            if (currentChar === stopSign) break // End the number conversion

            const number = brailleCharToNumber(currentChar)

            if (number == undefined) break // End the number conversion

            // TODO: OR check if . or ,

            numberString += number
        }
        return numberString

    } else {
        return undefined  // If the current character is not a number sign, return undefined
    }
}

function brailleCharToNumber(brailleChar) {
    return mapBrailleToNumber[brailleChar]
}