export function setCookieByBookId(bookId, data) {
    Cookies.set(bookId, data, { expires: 365 })
}

export function getCookieByBookId(bookId) {
    return Cookies.get(`${bookId}-latest-position`)
}