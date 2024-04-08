import { MetaData } from '../class/metadata.js'

export default async function fileReader(file) {

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(file, "text/xml");
    const metaData = getMetaData(xmlDoc)
    console.log(metaData) // information about this book
}

export function getMetaData(xmlDoc) {

    const meta = xmlDoc.querySelector("meta");

    if (meta) {

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

