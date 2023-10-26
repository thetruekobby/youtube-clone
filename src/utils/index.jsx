export const mockArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

export const numFormatter = (num) => {
    if (num > 999999999) return `${(num / 1000000000).toFixed(1)} B`
    if (num > 999999) return `${(num / 1000000).toFixed(1)} M`
    if (num > 999) return `${(num / 1000).toFixed(1)} K`
    return num.toString()
}
