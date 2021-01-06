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

serverExpress.get('/home', (req, res) => {
    res.status(200).send('<h1>THIS IS HOME PAGE EXPRESS LOGIN</h1>')
})

serverExpress.listen(port, () => console.log(`Server Express is running at ${port}`))