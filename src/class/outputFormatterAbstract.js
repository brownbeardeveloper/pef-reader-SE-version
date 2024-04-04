class OutputFormatterAbstract {
    /*
        This is an abstract class containing all formatting methods used by the Outputter
        to format the output.
    */

    // --- Formatting methods for the first page ---/

    // Formats the start of the title section on the first page.
    static formatFirstPageTitleStart()         { throw new Error("Not implemented!"); }

    // Formats the start of the author section on the first page.
    static formatFirstPageAuthorStart()        { throw new Error("Not implemented!"); }

    // Formats the start of the date section on the first page.
    static formatFirstPageDateStart()          { throw new Error("Not implemented!"); }

    // Formats the start of any other metadata section on the first page.
    static formatFirstPageOtherMetaDataStart() { throw new Error("Not implemented!"); }

    // Formats the end of the title section on the first page.
    static formatFirstPageTitleEnd()           { throw new Error("Not implemented!"); }

    // Formats the end of the author section on the first page.
    static formatFirstPageAuthorEnd()          { throw new Error("Not implemented!"); }

    // Formats the end of the date section on the first page.
    static formatFirstPageDateEnd()            { throw new Error("Not implemented!"); }

    // Formats the end of any other metadata section on the first page.
    static formatFirstPageOtherMetaDataEnd()   { throw new Error("Not implemented!"); }

    // --- Formatting methods for normal content ---/

    // Formats the start of the body content.
    static formatBodyStart()                   { throw new Error("Not implemented!"); }

    // Formats the start of a volume section.
    static formatVolumeStart()                 { throw new Error("Not implemented!"); }

    // Formats the start of a section within a volume.
    static formatSectionStart()                { throw new Error("Not implemented!"); }

    // Formats the start of a page within a section.
    static formatPageStart()                   { throw new Error("Not implemented!"); }

    // Formats the start of a row within a page.
    static formatRowStart()                    { throw new Error("Not implemented!"); }

    // Formats the end of the body content.
    static formatBodyEnd()                     { throw new Error("Not implemented!"); }

    // Formats the end of a volume section.
    static formatVolumeEnd()                   { throw new Error("Not implemented!"); }

    // Formats the end of a section within a volume.
    static formatSectionEnd()                  { throw new Error("Not implemented!"); }

    // Formats the end of a page within a section.
    static formatPageEnd()                     { throw new Error("Not implemented!"); }

    // Formats the end of a row within a page.
    static formatRowEnd()                      { throw new Error("Not implemented!"); }
}
