const metadataVariableTranslationMapSE = {
    "format": "Format",
    "identifier": "Medienummer",
    "title": "Titel",
    "creator": "Författare",
    "subject": "Ämne",
    "description": "Beskrivning",
    "publisher": "Utgivare",
    "contributor": "Medförfattare",
    "date": "Datum",
    "type": "Typ",
    "source": "ISBN",
    "language": "Språk",
    "rights": "Rättigheter",
    "volumes": "Volymer",
};

const bibliographicInformationTranslationMapSE = {
    "Braille book" : "Punktskriftsbok",
    "Unknown" : "Okänd",
}

const languageCodeTranslatorMap = {
    "sv": "Svenska",
    "en": "English"
}

export function bibliographicInformationTranslator(key, lang) {
    if (lang === 'Svenska') {
        return bibliographicInformationTranslationMapSE[key]
    }
}

export function metadataVariableTranslation(key, lang) {
    if(lang === 'Svenska') {
        return metadataVariableTranslationMapSE[key]
    } 
}

export function languageCodeTranslator(key) {
    return languageCodeTranslatorMap[key]
}