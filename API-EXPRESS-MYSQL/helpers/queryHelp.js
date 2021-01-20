module.exports = {
    generateQuery: (body) => {
        let result = ''
        for (let key in body) {
            result += ` ${key} = '${body[key]}',`
        }
        return result.slice(0, -1)
    }
}