export default function fileReader(pefFile) {

    const reader = new FileReader()

    reader.addEventListener("loadend", () => {
        return reader.result
    });

}