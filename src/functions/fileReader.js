import { MetaData } from '../class/metadata.js'

export function checkIfPefFileType(fileType) {
    return fileType === 'image/PEF'
}

export async function fileReader(file) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(file, "text/xml");
    const metaData = getMetaData(xmlDoc)
    const bodyData = getBodyData(xmlDoc)

    return bodyData
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

        // Create a new MetaData class
        const metaData = new MetaData(
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
        )

        return metaData

    } else {
        console.log("No meta element found in the XML.");
    }
}

class Page {
    constructor(pageIndex) {
        this.page = pageIndex;
        this.rows = [];
    }

    addRow(rowContent) {
        const trimmedContent = rowContent.trim();
        if (trimmedContent !== "") {
            this.rows.push(trimmedContent);
        }
    }
}

class Section {
    constructor(sectionIndex) {
        this.section = sectionIndex;
        this.pages = [];
    }

    addPage(pageIndex) {
        const newPage = new Page(pageIndex);
        this.pages.push(newPage);
        return newPage;
    }
}

class Volume {
    constructor(volumeIndex) {
        this.volume = volumeIndex;
        this.sections = [];
    }

    addSection(sectionIndex) {
        const newSection = new Section(sectionIndex);
        this.sections.push(newSection);
        return newSection;
    }
}

export function getBodyData(xmlDoc) {
    const body = xmlDoc.querySelector("body");

    if (!body) {
        console.log("No body element found in the XML.");
        return null;
    }

    const volumes = body.querySelectorAll("volume");
    const bodyData = { volumes: [] };

    volumes.forEach((volume, volumeIndex) => {
        const newVolume = new Volume(volumeIndex + 1);
        bodyData.volumes.push(newVolume);

        const sections = volume.querySelectorAll("section");
        sections.forEach((section, sectionIndex) => {
            const newSection = newVolume.addSection(sectionIndex + 1);

            const pages = section.querySelectorAll("page");
            pages.forEach((page, pageIndex) => {
                const newPage = newSection.addPage(pageIndex + 1);

                const rows = page.querySelectorAll("row");
                rows.forEach(row => {
                    newPage.addRow(row.textContent);
                });
            });
        });
    });

    return bodyData;
}
