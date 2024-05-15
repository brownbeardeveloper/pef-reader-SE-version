import Cookies from 'js-cookie';
import { CookieEnum } from '../data/enums';

export function setLatestPageIndexToCookie(bookId, pageIndex) {
    try {
        const pageId = `page-${pageIndex}` 
        const cookieJson = JSON.stringify(pageId);
        Cookies.set(`${bookId}-latest-position`, cookieJson, { expires: 365 });
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
}

export function getLatestPageIndexFromCookieJson(bookId) {
    try {
        const cookieJson = Cookies.get(`${bookId}-latest-position`);
        if (cookieJson) {
            const cookieJsonToStr = JSON.parse(cookieJson)
            return cookieJsonToStr.replace("page-", "")
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
            Cookies.set("allowCookie", CookieEnum.ALLOWED, { expires: 365 });
        } else {
            Cookies.set("allowCookie", CookieEnum.DENIED, { expires: 1 });
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