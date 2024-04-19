import Cookies from 'js-cookie';

export function setLatestRowPositionToCookie(bookId, rowId) {
    try {
        const cookieObj = JSON.stringify(rowId);
        Cookies.set(`${bookId}-latest-position`, cookieObj, { expires: 365 });
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
}

export function getLatestRowPositionFromCookieJson(bookId) {
    try {
        const cookieObj = Cookies.get(`${bookId}-latest-position`);
        if (cookieObj) {
            return JSON.parse(cookieObj);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting cookie:', error);
        return null;
    }
}

export function setAllowCookie(bool) {
    try {
        Cookies.set("allowCookie", bool, { expires: 365 });
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
}

export function getAllowCookie() {
    try {
        return Cookies.get("allowCookie");
    } catch (error) {
        console.error('Error getting cookie:', error);
        return null;
    }
}