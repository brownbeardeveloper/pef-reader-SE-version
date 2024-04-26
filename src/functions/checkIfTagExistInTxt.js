export function checkIfTagExistInTxt(tag, txt) {
    if (Array.isArray(tag)) {
        for (let item of tag) {
            if (txt.includes(item)) return true;
        }
        return false;
    } else {
        return txt.includes(tag);
    }
}
