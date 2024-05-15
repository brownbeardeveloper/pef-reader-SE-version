import brailleCharToLetter from "./brailleCharToLetter.js"
import braillePhraseToNumber from "./braillePhraseToNumber.js"
import isIgnoreSymbol from "./ignoreSymbols.js"
import brailleCharToPunctuation from "./brailleCharToPunctuation.js"
import braillePhraseToUpperCaseCharacters from "./braillePhraseToUpperCaseCharaters.js"
import { blankSign } from "../../data/MapBrailleToSwedishCharacters.js"

export default function brailleTranslator(braillePhrase) {

    if (braillePhrase === null || (typeof braillePhrase !== 'string' && !Array.isArray(braillePhrase))) {
        return null; 
    }

    let newPhrase = ""

    for (let i = 0; i < braillePhrase.length; i++) {

        let currentBrailleChar = braillePhrase.charAt(i)
        let newChar // undefined

        if (isIgnoreSymbol(currentBrailleChar)) {
            newPhrase += currentBrailleChar
            continue
        }

        if (currentBrailleChar === blankSign) {
            newPhrase += ' ' // adding a space
            continue
        }

        if ((newChar = brailleCharToLetter(currentBrailleChar))) {
            newPhrase += newChar
            continue
        }

        if (i + 1 < braillePhrase.length) { // If longer than the current phrase's length

            //Check for next character
            let nextChar = braillePhrase.charAt(i + 1)

            // add current and next symbols together
            const doubleSymbols = currentBrailleChar + nextChar

            if (isIgnoreSymbol(doubleSymbols)) {
                newPhrase += doubleSymbols
                i++ // should this be +2 ? 
                continue
            }

            //Two character punctuation and special braille signs
            newChar = brailleCharToPunctuation(doubleSymbols)

            if (newChar) {
                newPhrase += newChar
                i++ // should this be +2 ? 
                continue
            }
        }

        if ((newChar = brailleCharToPunctuation(currentBrailleChar))) {
            newPhrase += newChar
            continue
        }

        if ((newChar = braillePhraseToUpperCaseCharacters(braillePhrase, i))) { // there's an error 
            newPhrase += newChar
            i++

            if (newChar.length > 1) {
                i += newChar.length +1 // added +1 and it seems work fine but not 100 precent then check it again later
            }

            continue
        }

        if ((newChar = braillePhraseToNumber(braillePhrase, i))) {
            newPhrase += newChar
            i += newChar.length
            continue
        }

        console.log("No suitable replacement found for this braille symbol", currentBrailleChar)
        newPhrase += currentBrailleChar
    }
    return newPhrase
}