const {body, validationResult}= require('express-validator')

let database = [
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

// NOTE EXPORT SEMUA CONTROLLER
module.exports = {
    getUser: (req, res) => {
        res.status(200).send(database)
    },

    login: (req, res) => {
        // NOTE inputan dari user, akan masuk ke dlm req.body
        const { username, password } = req.body
    
        let userIndex = database.findIndex(
            (item) => item.username === username && item.password === password
        )
    
        // NOTE kita bisa kasih response (res) ketika ada kesalahan saat login
        if (userIndex === -1) return res.status(400).send('Invalid Username or Password')
    
        res.status(200).send(database[userIndex])
    },

    register: (req, res) => {
        let errors= validationResult(req)
        console.log(errors)
        console.log(errors.array())

        const message= errors.array().map(
            (item) => item.msg
        )
        console.log(message)

        if (!errors.isEmpty()) {
            return res.status(400).send({ message })
        }

        database.push(req.body)
        res.status(200).send(database)
    },

    edit: (req, res) => {
        // NOTE pakai plus didepan supaya di parse ke angka (kayak parseint)
        // NOTE ambil data user yg mau di edit
        let tempUser = database[+req.params.index]
    
        // NOTE kalau usernya tidak ada
        if (!tempUser) return res.status(400).send(`NO USERS WITH INDEX ${req.params.index}`)
    
        console.log(tempUser) // NOTE buat cari dapet ga objectnya
        console.log(req.body)
    
        // NOTE looping untuk meng-edit data user
        for (let key in req.body) {
            for (let key2 in tempUser) {
                if (key === key2) {
                    tempUser[key2] = req.body[key]
                }
            }
        }
    
        res.status(200).send(database)
    },

    delete: (req, res) => {
        // NOTE pakai plus didepan supaya di parse ke angka (kayak parseint)
        // NOTE ambil data user yg mau di edit
        let tempUser= database[+req.params.index]
    
        // NOTE kalau usernya tidak ada
        if (!tempUser) return res.status(400).send(`NO USERS WITH INDEX ${req.params.index}`)
    
        database.splice([+req.params.index], 1)
    
        res.status(200).send(database)
    }
}