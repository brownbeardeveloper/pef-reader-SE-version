
export const numberSign = '⠼'
export const upperCaseSign = '⠠'
export const stopSign = "⠱"
export const blankSign = "⠀"
export const ignoreBrailleCharacters = [ // Remove and correct later if needed
    "⠨", "⠱", "⠬", "⠣", // single character
    "⠠⠄", "⠠⠤", "⠨⠔", "⠱⠔", "⠨⠨", "⠨⠶", "⠱⠶", "⠨⠤", "⠱⠤", "⠨⠢", "⠱⠢", "⠱⠂", "⠨⠖", "⠱⠖" // double characters
]

/* Scandinavian Braille */
// Reference: https://www.pharmabraille.com/wp-content/uploads/2015/01/Svenska_skrivregler_for_punktskrift.pdf by Punktskriftsnämnden

export const mapBrailleToAlpha = {
    '⠁': 'a',
    '⠃': 'b',
    '⠉': 'c',
    '⠙': 'd',
    '⠑': 'e',
    '⠿': 'é',
    '⠋': 'f',
    '⠛': 'g',
    '⠓': 'h',
    '⠊': 'i',
    '⠚': 'j',
    '⠅': 'k',
    '⠇': 'l',
    '⠍': 'm',
    '⠝': 'n',
    '⠕': 'o',
    '⠏': 'p',
    '⠟': 'q',
    '⠗': 'r',
    '⠎': 's',
    '⠞': 't',
    '⠥': 'u',
    '⠳': 'ü',
    '⠧': 'v',
    '⠺': 'w',
    '⠭': 'x',
    '⠽': 'y',
    '⠵': 'z',
    '⠜': 'ä',
    '⠡': 'å',
    '⠪': 'ö',

    // '⠷': 'á', corresponds to '[' in braille
}

export const mapBrailleToNumber = {
    '⠚': '0',
    '⠁': '1',
    '⠃': '2',
    '⠉': '3',
    '⠙': '4',
    '⠑': '5',
    '⠋': '6',
    '⠛': '7',
    '⠓': '8',
    '⠊': '9',
}

export const mapBrailleToPunctuation = {

    /* translating one-letter Braille sequences into punctuation */
    "⠦": "(",
    "⠴": ")",
    "⠷": "[",
    "⠾": "]",
    "⠬": "§",
    "⠯": "&",
    "⠔": "*",
    "⠰": "”",
    "⠸": "|",
    "⠄": ".",
    "⠂": ",",
    "⠢": "?",
    "⠖": "!",
    "⠒": ":",
    "⠆": ";",
    "⠌": "/",
    "⠐": "'",
    "⠤": "-",
    "⠹": "%",

    /* translating two-letter Braille sequences into punctuation */
    "⠘⠉": "¢",
    "⠘⠎": "$",
    "⠘⠑": "€",
    "⠘⠇": "£",
    "⠘⠽": "¥",
    "⠠⠷": "{",
    "⠠⠾": "}",
    "⠘⠤": "_",
    "⠘⠌": "\\",
    "⠘⠷": "@",
    "⠘⠼": "#",
    "⠘⠲": "†",
    "⠘⠒": "~",
    "⠤⠤": "–",
    "⠹⠹": "‰",
    "⠼⠪" : "<",
    "⠼⠕" : ">",

    /* translating three-letter Braille sequences into punctuation (not yet tested and requires adjustments in the brailleTranslator code) */
    "⠦⠉⠴": "©",
    "⠦⠗⠴": "®",

    /* translating four-letter Braille sequences into punctuation (not yet tested and requires adjustments in the brailleTranslator code) */ 
    "⠦⠞⠍⠴": "™",
};


/*
missing:
one-letter: "•" 
two-letter: 
three-letter:
four-letter:
*/