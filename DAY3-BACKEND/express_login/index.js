const express = require('express') // NOTE fungsi express ini adalah untuk pengganti HTTP

// NOTE body parser ini u/mengambil data body dari request (gaperlu papke req.on dl lg)
// NOTE ngambil pake body parser udah lgsg diubah gaperlu lg input= chunk.toString() sama let obj= JSON.parse(input)
const bodyParser = require('body-parser')

// NOTE untuk izin akses
const cors = require('cors')

// NOTE buat server
const serverExpress = express()

const port = 2000

// const url= require('url')
// const alamat= url.parse(req.url)


// NOTE pakai module
serverExpress.use(bodyParser.json())
serverExpress.use(cors())


// NOTE untuk nampilin home
serverExpress.get('/home', (req, res) => {
    res.status(200).send('<h1>THIS IS HOME PAGE EXPRESS LOGIN</h1>')
})

// NOTE connect to all router
const {userRouter} = require('./routers')
serverExpress.use('/user', userRouter)

// REVIEW INI DIBAWAH BUAT SEBELOM ROUTER DAN CONTROLLER DIPISAH

// // NOTE untuk nampilin semua users
// serverExpress.post('/users', (req, res) => {
    //     res.status(200).send(database)
    // })

// // NOTE untuk register user baru
// serverExpress.post('/register', )

// // NOTE untuk login users
// serverExpress.post('/login', )

// // NOTE untuk edit user
// serverExpress.post('/edit/:index', )

// // NOTE untuk delet salah satu user
// serverExpress.post('/delete/:index', )

serverExpress.listen(port, () => console.log(`Server Express is running at ${port}`))