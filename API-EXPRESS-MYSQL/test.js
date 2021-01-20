const input= {
    username: "janedjaja"
}
console.log('cata pertama', input.email)
console.log('cata kedua', input['email'])

// NOTE kenapa pas di looping ga paje string kyk di cara kedua?
// NOTE krn kalo looping pake let in, si key nya udah jd string, krn looping itu buat object
generateQuery = (body) => {
    let result= ''
    for (let key in body) {
        result += ` ${key} = '${body[key]}',`
    }
    return result.slice(0, -1)
}

const queryEditUser= `update users set${generate(input)}`

console.log('queryEditUser nya', queryEditUser)