export class MetaData {
    constructor(
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
    ) {
        this.format = format;
        this.identifier = identifier;
        this.title = title;
        this.creator = creator;
        this.subject = subject;
        this.description = description;
        this.publisher = publisher;
        this.contributor = contributor;
        this.date = date;
        this.type = type;
        this.source = source;
        this.language = language;
        this.relation = relation;
        this.coverage = coverage;
        this.rights = rights;
    }
};
