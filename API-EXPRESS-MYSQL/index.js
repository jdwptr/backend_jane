// NOTE import module

// NOTE fungsi express ini adalah untuk pengganti HTTP Module
const express= require('express')

// NOTE body parser ini u/mengambil data body dari request (gaperlu papke req.on dl lg)
// NOTE ngambil pake body parser udah lgsg diubah gaperlu lg input= chunk.toString() sama let obj= JSON.parse(input)
const bodyParser= require('body-parser')

// NOTE untuk izin akses
const cors= require('cors')

// NOTE create app // BAHAN UTAMA UNTUK BUAT APP KITA
const app= express()

// NOTE import module mysql unutk menyambungkan API dengan MySQL
const mysql= require('mysql')

// NOTE apply middleware
app.use(bodyParser.json())
app.use(cors())

// NOTE Setup MYSQL
const db= require('./database')

// NOTE import routernya
// NOTE ngambilnya object krn di exportnya object
const {productRouter}= require('./routers')
app.use('/product', productRouter)

db.connect((err) => {
    if (err) return console.log(`ERROR CONNECTING: ${err.stack}`)
    console.log(`CONNECTED AS ID: ${db.threadId}`)
})

// NOTE Create Home Route nya
app.get('/', (req, res) => {
    res.status(200).send(`<h1>THIS IS MY HOMEPAGE EXPRESS & MYSQL LOGIN</h1>`)
})

const port = 2000
app.listen(port, () => console.log(`Server is Running at: ${port}`))