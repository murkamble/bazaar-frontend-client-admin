const baseUrl = "https://bazaar-by-mayur-kamble.herokuapp.com"

export const api = `${baseUrl}/api`

export const generatePublicUrl = (fileName) => {
    // return `${baseUrl}/public/${fileName}`
    return `${fileName}`
}
