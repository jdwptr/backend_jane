// import module yg kita perlukan
const http= require('http')

// fs untuk baca file
const fs= require('fs')

// NOTE modul url untuk membedah suatu link/url
const url= require('url')

// NOTE define port nya
const port= 2000

// NOTE database nya dibikin di dlm
let database= [
    {
        username: "lisa",
        password: 'lisa1',
        email: 'lisa@gmail.com'
    },
    {
        username: "jennie",
        password: 'jennie1',
        email: 'jennie@gmail.com'
    },
    {
        username: "rose",
        password: 'rose1',
        email: 'rose@gmail.com'
    }
]

// NOTE pakai server
const serverTugas= http.createServer((req, res) => {
    // NOTE akses index untuk edit dari user menggunakan modul url (pakai query)
    console.log(req.url)
    const alamat= url.parse(req.url)
    console.log(alamat)

    if (req.url === '/home') {
        let home= fs.readFileSync('home.html', 'utf-8')
        res.writeHead(200, {'content-type': 'text/html'})
        res.end(home)
    }
    else if (req.url === '/users') {
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify(database))
    }
    else if (req.url === '/login') {
        // NOTE get data dari user
        // NOTE define input nya string kosong
        let input = ''
        req.on('data', (chunk) => {
            input= chunk.toString()
            console.log(`Inputnya jadi ${input}`)
        }) // NOTE kalo udah berhasil, 
        .on('end', () => {
            let obj= JSON.parse(input)
            // console.log(`Obj nya jadi gini ${obj}`)
            console.log(obj)
            let username= obj.username
            let password= obj.password
            console.log(`Username ${username}, Password ${password}`)

            // NOTE untuk mencari data user di database yg sesuai dgn data yg dikirim oleh user
            let userIndex= database.findIndex(
                (item) => item.username === username && item.password === password
            )
            console.log(`UserIndex nya ${userIndex}`)

            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(database[userIndex]))
        })
    }
    else if (req.url === '/register') {
        // NOTE kalo butuh inputan dr user, sellau pake req.on
        let input = ''
        req.on ('data', (chunk) => {
            input = chunk.toString()
            console.log(`Inputnya jadi ${input}`)
        })
        .on('end', () => {
            let obj= JSON.parse(input)
            console.log(obj)
            // ambil data dari user
            // let username= obj.username
            // let password= obj.password
            // let email= obj.email
            // console.log(`Username ${username}, Password ${password}, Email ${email}`)

            // // push data user baru ke dalam database
            // database.push({username, password, email})
            database.push(obj)
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(database))
        })
    }
    else if (alamat.pathname === '/edit') {
        let input= ''
        req.on('data', (chunk) => {
            input= chunk.toString()
            console.log(`Inputnya jadi ${input}`)
        })
        .on('end', () => {
            // NOTE get data user yg mana yg mau di edit
            let itemUser= database[alamat.query]
            console.log(itemUser)

            let obj= JSON.parse(input)
            console.log(obj)

            // REVIEW
            // NOTE lakukan looping u/edit data sesuai keinginan user
            // NOTE for in = untuk melooping didalam object
            // NOTE for of = untuk melooping didalam array
            for(let key in obj) {
                for(let key2 in itemUser) {
                    if (key === key2) {
                        itemUser[key2] = obj[key]
                    }
                }
            }

            // REVIEW
            // NOTE ganti database nya pakai splice, alamat.query buat ngambil index nya yg mana
            database.splice(alamat.query, 1, itemUser)
            res.writeHead(200, {'content-type': 'application/json'})
            res.end(JSON.stringify(database))
        })
    }
})

serverTugas.listen(port, () => console.log(`Server Tugas is running at ${port}`))