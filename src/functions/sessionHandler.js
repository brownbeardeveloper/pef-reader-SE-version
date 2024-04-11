export function getSessionStorageDataByFileId(fileId) {
    if (fileId) {
        const sessionObjStr = sessionStorage.getItem(`mtm-pef-${fileId}-oneflow`);
        const sessionObj = JSON.parse(sessionObjStr)
        console.log(sessionObj);
    } else {
        console.error('fileId is null or undefined.');
    }
}

export function setSessionStorageDataByFileId(fileId, i, j, k, l) {
    const sessionObj = {
        data: true,
        i: i,
        j: j,
        k: k,
        l: l
    }
    const sessionObjStr = JSON.stringify(sessionObj)
    sessionStorage.setItem(`mtm-pef-${fileId}-oneflow`, sessionObjStr);
}

export function removeSessionStorageDataByFileId(fileId) {
    sessionStorage.removeItem(`mtm-pef-${fileId}-oneflow`)
}
