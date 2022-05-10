export function convertDate(date: string): string {
    if (date.includes("/")) {
        return date.split("/").reverse().join("/")
    }

    if (date.includes("-")) {
        return date.split("-").reverse().join("/")
    }

    return date.split(".").reverse().join("/")

}