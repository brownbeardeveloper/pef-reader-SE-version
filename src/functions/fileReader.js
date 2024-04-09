
export function checkIfPefFileType(fileType) {
    return fileType === 'image/PEF'
}

export async function fileReader(file) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(file, "text/xml");
    const metaData = getMetaData(xmlDoc)
    const bodyData = getBodyData(xmlDoc)
    const pefObject = {metaData, bodyData}

    return pefObject
}

export function getMetaData(xmlDoc) {

    const meta = xmlDoc.querySelector("meta");

    if (meta) {

        // Saves important information in meta otherwise returns null
        const identifier = meta.querySelector("identifier")?.textContent || null;
        const title = meta.querySelector("title")?.textContent || null;
        const date = meta.querySelector("date")?.textContent || null;
        const language = meta.querySelector("language")?.textContent || null;
        const publisher = meta.querySelector("publisher")?.textContent || null;
        const creator = meta.querySelector("creator")?.textContent || null;
        const description = meta.querySelector("description")?.textContent || null;
        const format = meta.querySelector("format")?.textContent || null;
        const contributor = meta.querySelector("contributor")?.textContent || null;
        const source = meta.querySelector("source")?.textContent || null;
        const subject = meta.querySelector("subject")?.textContent || null;
        const type = meta.querySelector("type")?.textContent || null;
        const relation = meta.querySelector("relation")?.textContent || null;
        const coverage = meta.querySelector("coverage")?.textContent || null;
        const rights = meta.querySelector("rights")?.textContent || null;

        // Create a new MetaData object
        const metaData = {
            format,
            identifier,
            title,
            creator,
            subject,
            description,
            publisher,
            contributor,
            date,
            type,
            source,
            language,
            relation,
            coverage,
            rights
        }

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

        volumes.forEach((volume, volumeIndex) => {
            const sections = volume.querySelectorAll("section");
            const volumeObj = {
                sections: []
            };

            sections.forEach((section, sectionIndex) => {
                const pages = section.querySelectorAll("page");
                const sectionObj = {
                    pages: []
                };

                pages.forEach((page, pageIndex) => {
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
