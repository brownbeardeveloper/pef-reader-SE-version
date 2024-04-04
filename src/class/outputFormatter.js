class OutputFormatter extends OutputFormatterAbstract {
    // First page
    static formatFirstPageTitleStart()     { return '<h1 tabindex=-1 id="newPage" class="first-page-title">'; }
    static formatFirstPageAuthorStart()    { return '<h2 class="first-page-author">'; }
    static formatFirstPageDateStart()      { return '<h3 class="first-page-date">'; }
    static firstPageMetaDataTableStart()   { return '<table>'; } //lang="en-GB"
    static formatFirstPageMetaKeyStart()   { return '<tr><td>'; }
    static formatFirstPageMetaValueStart() { return '<td>'; }

    static formatFirstPageTitleEnd()       { return '</h2>'; }
    static formatFirstPageAuthorEnd()      { return '</h4>'; }
    static formatFirstPageDateEnd()        { return '</h6>'; }
    static firstPageMetaDataTableEnd()     { return '</table>'; }
    static formatFirstPageMetaKeyEnd()     { return '</td>'; }
    static formatFirstPageMetaValueEnd()   { return '</td></tr>'; }

    // Normal content
    static formatBodyStart()               { return '<div class="body">'; }
    static formatVolumeStart(id)           { return '<div class="volume" id ="vol'+id+'" tabindex = -1'; }
    static formatSectionStart()            { return '<div class="section">'; }
    static formatPageStart()               { return '<div id = "bookPage" class="page">'; }
    static formatRowStart()                { return ''; }

    static formatBodyEnd()                 { return '</div>'; }
    static formatVolumeEnd()               { return '</div>'; }
    static formatSectionEnd()              { return '</div>'; }
    static formatPageEnd()                 { return '</div>'; }
    static formatRowEnd()                  { return '<br>'; }
}
