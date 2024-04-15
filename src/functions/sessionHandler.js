export function getSessionStorageDataByFileIdAsOneFlow(fileId) {
    if (fileId) {
        const sessionObjStr = sessionStorage.getItem(`mtm-pef-${fileId}-oneflow`);
        const sessionObj = JSON.parse(sessionObjStr)
        console.log(sessionObj);
        return sessionObj
    } else {
        console.error('fileId is null or undefined.');
    }
}

export function setSessionStorageDataByFileId(fileId, rowId) {
    const sessionObjStr = JSON.stringify(rowId)
    sessionStorage.setItem(`mtm-pef-${fileId}-oneflow`, sessionObjStr);
}

export function removeSessionStorageDataByFileId(fileId) {
    sessionStorage.removeItem(`mtm-pef-${fileId}-oneflow`)
}
