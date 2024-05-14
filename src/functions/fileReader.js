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

        /* Programmers, forgive me for those swedish variables */

        // Saves important information in meta otherwise returns null
        const identifier = meta.querySelector("identifier")?.textContent || null;
        const titel = meta.querySelector("title")?.textContent || null;
        const datum = meta.querySelector("date")?.textContent || null;
        const språk = meta.querySelector("language")?.textContent || null;
        const utgivare = meta.querySelector("publisher")?.textContent || null;
        const skapare = meta.querySelector("creator")?.textContent || null;
        const beskrivning = meta.querySelector("description")?.textContent || null;
        const format = meta.querySelector("format")?.textContent || null;
        const bidragsgivare = meta.querySelector("contributor")?.textContent || null;
        const källa = meta.querySelector("source")?.textContent || null;
        const ämne = meta.querySelector("subject")?.textContent || null;
        const typ = meta.querySelector("type")?.textContent || null;
        const relation = meta.querySelector("relation")?.textContent || null;
        const täckning = meta.querySelector("coverage")?.textContent || null;
        const rättigheter = meta.querySelector("rights")?.textContent || null;
        const ark = meta.querySelector("sheets")?.textContent || null;
        const volymer = meta.querySelector("volumes")?.textContent || null;
        const antalKiloTecken = meta.querySelector("kiloChars")?.textContent || null;

        // Create a new MetaData object (SE version)
        const metaDataSE = {
            format,
            identifier,
            titel,
            skapare,
            ämne,
            beskrivning,
            utgivare,
            bidragsgivare,
            datum,
            typ,
            källa,
            språk,
            relation,
            täckning,
            rättigheter,
            ark,
            volymer,
            "antal tecken i tusental": antalKiloTecken
        };

        return metaDataSE

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
