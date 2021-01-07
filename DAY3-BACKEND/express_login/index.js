const express= require('express') // NOTE fungsi express ini adalah untuk pengganti HTTP

// NOTE body parser ini u/mengambil data body dari request (gaperlu papke req.on dl lg)
// NOTE ngambil pake body parser udah lgsg diubah gaperlu lg input= chunk.toString() sama let obj= JSON.parse(input)
const bodyParser= require('body-parser')

// NOTE untuk izin akses
const cors= require('cors')

// NOTE buat server
const serverExpress= express()

const port= 2000



// NOTE pakai module
serverExpress.use(bodyParser.json())
serverExpress.use(cors())

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

serverExpress.get('/home', (req, res) => {
    res.status(200).send('<h1>THIS IS HOME PAGE EXPRESS LOGIN</h1>')
})

serverExpress.get('/users', (req,res) => {
    res.status(200).send(database)
})

serverExpress.post('/login', (req, res) => {
    // NOTE inputan dari user, akan masuk ke dlm req.body
    const {username, password} = req.body

    let userIndex= database.findIndex(
        (item) => item.username === username && item.password === password
    )

    // NOTE kita bisa kasih response (res) ketika ada kesalahan saat login
    if (userIndex === -1) return res.status(400).send('Invalid Username or Password')

    res.status(200).send(database[userIndex])
})

serverExpress.post('/register', (req, res) => {
    database.push(req.body)

    res.status(200).send(database)
})

serverExpress.post('/edit', (req, res) => {
    const url= require('url')
    const alamat= url.parse(req.url)

    let itemUser= database[alamat.query]
    for (let key in database) {
        for (let key2 in itemUser) {
            if (key === key2) {
                itemUser[key2] = database[key]
            }
        }
    }
    
    database.splice(alamat.query, 1, itemUser)
    res.status(200).send(database)
})

serverExpress.listen(port, () => console.log(`Server Express is running at ${port}`))