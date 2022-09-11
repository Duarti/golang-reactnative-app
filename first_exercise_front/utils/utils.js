export const formatPassword = password => {
    let result = ""
    for (let i = 0; i < password?.length; i++) {
        result = result + "*"
    }
    return result
}