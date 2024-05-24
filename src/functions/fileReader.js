import { languageCodeTranslator, bibliographicInformationTranslator } from "../data/metadata-translator";

const KNOWN_PEF_FILE_TYPES = ['image/PEF', 'image/x-pentax-pef', 'application/x-pef+xml'];

export function checkIfPefFileType(fileType) {
    return KNOWN_PEF_FILE_TYPES.includes(fileType);
}

export async function fileReader(file) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(file, "text/xml");
    const metaData = getMetaData(xmlDoc)
    const bodyData = getBodyData(xmlDoc)
    const pefObject = { metaData, bodyData }

    return pefObject
}

export function getMetaData(xmlDoc) {

    const meta = xmlDoc.querySelector("meta");

    if (meta) {

        // Saves important information in meta otherwise returns null
        const identifier = meta.querySelector("identifier")?.textContent || null;
        const title = meta.querySelector("title")?.textContent || null;
        const language = meta.querySelector("language")?.textContent || null;
        const publisher = meta.querySelector("publisher")?.textContent || null;
        const creator = meta.querySelector("creator")?.textContent || null;
        const description = meta.querySelector("description")?.textContent || null;
        const format = meta.querySelector("format")?.textContent || null;
        const contributor = meta.querySelector("contributor")?.textContent || null;
        const source = meta.querySelector("source")?.textContent || null;
        const subject = meta.querySelector("subject")?.textContent || null;
        const type = meta.querySelector("type")?.textContent || null;
        const rights = meta.querySelector("rights")?.textContent || null;
        const volumes = meta.querySelector("volumes")?.textContent || null;

        const bookFormat = checkIfPefFileType(format) ? "Braille book" : "Unknown"

        // Create a new MetaData object
        const metaData = {
            format: bibliographicInformationTranslator(bookFormat),
            identifier,
            title,
            author: creator,
            subject,
            description,
            publisher,
            contributor,
            type,
            source: source ? source.replace("urn:isbn:", "") : null,
            language: languageCodeTranslator(language),
            rights,
            volumes,
        };
        return metaData

    } else {
        console.log("No meta element found in the XML.");
    }
}

export function getBodyData(xmlDoc) {
    const body = xmlDoc.querySelector("body");

    if (body) {
        const volumes = body.querySelectorAll("volume");
        const bodyData = {
            volumes: []
        };
        volumes.forEach((volume) => {
            const sections = volume.querySelectorAll("section");
            const volumeObj = {
                sections: []
            };
            sections.forEach((section) => {
                const pages = section.querySelectorAll("page");
                const sectionObj = {
                    pages: []
                };
                pages.forEach((page) => {
                    const rows = page.querySelectorAll("row");
                    const pageObj = {
                        rows: []
                    };
                    rows.forEach(row => {
                        const trimmedContent = row.textContent.trim();
                        if (trimmedContent !== "") {
                            pageObj.rows.push(trimmedContent);
                        }
                    });
                    if (pageObj.rows.length > 0) {
                        sectionObj.pages.push(pageObj);
                    }
                });
                if (sectionObj.pages.length > 0) {
                    volumeObj.sections.push(sectionObj);
                }
            });
            bodyData.volumes.push(volumeObj);
        });

        return bodyData;
    } else {
        console.log("No body element found in the XML.");
    }
}
