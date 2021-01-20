// NOTE import module yg dibutuhkan
const { body, validationResult } = require('express-validator')

// NOTE ini untuk encrypt pass
const cryptojs = require('crypto-js')
const SECRET_KEY = process.env.SECRET_KEY
const {createToken}= require('../helpers/jwt')

//NOTE import query help
const { generateQuery, asyncQuery } = require('../helpers/queryHelp')

// NOTE import connection (import database nya dulu)
const db = require('../database')

module.exports = {
    getAllUser: (req, res) => {
        // NOTE define query SQL
        const queryUser = 'SELECT * FROM USERS'

        db.query(queryUser, (err, result) => {
            // NOTE check error
            if (err) return res.status(500).send(err)

            // NOTE kalo berhasil
            res.status(200).send(result)
        })
    },

    login: (req, res) => {
        // NOTE inputan dari user, akan masuk ke dlm req.body
        // NOTE object destructuring
        const { username, password } = req.body

        // REVIEW
        // NOTE ENCRYPT PASS WITH CRYPTO JS
        // NOTE data yg sudah di encrypt oleh crypto js tidak bisa didecrypt
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)

        // NOTE define query SQL
        const queryLogin = `select id_users, username, email, password from users 
                        where username=${db.escape(username)} 
                        and password=${db.escape(hashpass.toString())}`

        db.query(queryLogin, (err, result) => {
            // NOTE check error
            if (err) return res.status(500).send(err)

            // REVIEW
            // NOTE result bentuknya array of object
            // console.log(result)
            // NOTE cek kalau login berhasil
            if (result.length === 0) return res.status(400).send('USERNAME OR PASSWORD IS WRONG')

            // NOTE ini untuk create token
            let token= createToken({ id: result[0].id_users, username: result[0].username })
            console.log(result[0])

            // NOTE input token to result
            result[0].token = token

            console.log(result[0])

            // NOTE kalo berhasil
            res.status(200).send(result[0])
        })
    },
    
    keepLogin: async(req, res) => {
        console(req.user)

        try {
            // NOTE query u/ get data from database
            const getUser= `select id_users, username, email from users
                            where id_users${db.escape(req.user.id)}`
        
            const result= await asyncQuery(getUser)
            console.log(result)

            res.status(200).send(result[0])
        }
        catch{
            console.log(err)
        }
    },

    register: (req, res) => {
        const { username, password, email } = req.body
        // NOTE error tertampung di validation result, ditampung krn nanti mau di cek
        // NOTE VALIDATION INPUT FROM USERS 
        const errors = validationResult(req)
        console.log(errors)

        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        // REVIEW
        // NOTE ENCRYPT PASS WITH CRYPTO JS
        // NOTE data yg sudah di encrypt oleh crypto js tidak bisa didecrypt
        const hashpass = cryptojs.HmacMD5(password, SECRET_KEY)

        // NOTE untuk lihat bentuknya hashpass
        // console.log('haspass', hashpass.toString())

        // NOTE kalau tidak ada error, baru proses penambahan data user baru berjalan
        const queryCheckReg = `select * from users 
                              where username=${db.escape(username)}
                              or email=${db.escape(email)}`

        db.query(queryCheckReg, (err, result) => {
            // NOTE cek error
            if (err) return res.status(500).send(err)

            // NOTE cek apakah di dlm database ada usernam atau email yang sama
            if (result.length !== 0) return res.status(400).send('USERNAME OR EMAIL ALREADY EXIST')

            const queryReg = `insert into users (username, email, password)
                             values (${db.escape(username)}, ${db.escape(email)}, ${db.escape(hashpass.toString())})`

            db.query(queryReg, (err2, result2) => {
                // NOTE cek error
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })

        // NOTE ini buat ngetes haspass, si dbquery diatas di comment dulu trs jalanin si res.status test nya
        // res.status(200).send('test hashpassword')
    },

    edit: (req, res) => {
        // NOTE edit butuh params, untuk yg di edit itu user berapa
        const id = +req.params.id

        // note validation input from user
        const errors = validationResult(req)
        console.log(errors.errors)

        const errUsername = errors.errors.filter(item => item.param === 'username' && item.value !== undefined)
        console.log(errUsername)
        if (errUsername.length !== 0) return res.status(400).send(errUsername[0].msg)

        const errEmail = errors.errors.filter(item => item.param === 'email' && item.value !== undefined)
        console.log(errEmail)
        if (errEmail.length !== 0) return res.status(400).send(errEmail[0].msg)
        

        const queryCekUser = `select * from users where id_users=${db.escape(id)}`

        db.query(queryCekUser, (err, result) => {
            if (err) return res.status(500).send(err)

            // NOTE kalau id user gaketemu/gak ada, tampilkan
            if (result.length === 0) return res.status(200).send(`USER WITH ID: ${id}, IS NOT FOUND`)

            // NOTE pakai helper buat kalo dia mau ganti username doang, emial pass ngga dll bisa jd nya
            const queryEditUser = `update users set${generateQuery(req.body)} where id_users=${id}`
            // console.log(queryEditUser)
            // res.status(200).send('testing generate query')

            db.query(queryEditUser, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })

        })
    },

    editPass: (req, res) => {
        // NOTE edit butuh params, untuk yg di edit itu user berapa
        const id = +req.params.id

        // NOTE validation input from user
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        const queryCekUser = `select * from users where id_users=${db.escape(id)}`

        db.query(queryCekUser, (err, result) => {
            if (err) return res.status(500).send(err)

            // NOTE kalau id user gaketemu/gak ada, tampilkan
            if (result.length === 0) return res.status(200).send(`USER WITH ID: ${id}, IS NOT FOUND`)

            // REVIEW
            // NOTE ENCRYPT PASS WITH CRYPTO JS
            // NOTE data yg sudah di encrypt oleh crypto js tidak bisa didecrypt
            const hashpass = cryptojs.HmacMD5(req.body.password, SECRET_KEY)

            // NOTE queryeditpass
            const queryEditPass= `update users set password=${db.escape(hashpass.toString())} where id_users=${id}`

            db.query(queryEditPass, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
    },

    deleteUser: (req, res) => {
        // NOTE edit butuh params, untuk yg di edit itu user berapa
        const id = +req.params.id

        const queryCekUser = `select * from users where id_users=${db.escape(id)}`

        db.query(queryCekUser, (err, result) => {
            if (err) return res.status(500).send(err)

            // NOTE kalau id user gaketemu/gak ada, tampilkan
            if (result.length === 0) res.status(200).send(`USER WITH ID: ${id}, IS NOT FOUND`)

            const queryDelUser= `delete from users where id_users=${id}`

            db.query(queryDelUser, (err2, result2) => {
                if (err2) return res.status(500).send(err2)

                res.status(200).send(result2)
            })
        })
    }
}