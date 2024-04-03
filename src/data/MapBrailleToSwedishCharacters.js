
export const numberSign = '⠼'
export const upperCaseSign = '⠠'
export const stopSign = "⠱"
export const blankSign = "⠀"
export const ignoreBrailleCharacters = [ // Remove and correct later if needed
    "⠨","⠱","⠬","⠣", // single character
    "⠠⠄","⠠⠤","⠨⠔","⠱⠔","⠨⠨","⠨⠶","⠱⠶","⠨⠤", "⠱⠤","⠨⠢","⠱⠢","⠱⠂","⠨⠖","⠱⠖" // double characters
]

export const mapBrailleToAlpha = {
    '⠁': 'a',
    '⠃': 'b',
    '⠉': 'c',
    '⠙': 'd',
    '⠑': 'e',
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
    '⠧': 'v',
    '⠺': 'w',
    '⠭': 'x',
    '⠽': 'y',
    '⠵': 'z',
    '⠜': 'ä',
    '⠡': 'å',
    '⠷': 'á', // remove?
    '⠪': 'ö',
    '⠳': 'ü', // remove?
    '⠿': 'é', // remove?
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

    /* simple braille to punctuation */
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

    /* double brailles to punctuation */
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
    "⠤⠤": "–"

    /* triple brailles to punctuation */
    // add more characters
};


/*

missing:

single: %,

double: ‰, <, >, 

*/