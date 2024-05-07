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

export function setAllowCookie(boolean) {
    try {
        if(boolean) {
            Cookies.set("allowCookie", "allowed", { expires: 365 });
        } else {
            Cookies.set("allowCookie", "denied", { expires: 1 });
        }
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
}

export function getAllowCookie() {
    try {
        const cookiePermission = Cookies.get("allowCookie")
        return cookiePermission
    } catch (error) {
        console.error('Error getting cookie:', error);
        return null;
    }
}