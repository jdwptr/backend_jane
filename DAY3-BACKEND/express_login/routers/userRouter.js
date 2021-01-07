// NOTE import module express beserta method Router nya
// NOTE method router dari express, berguna untuk membuat router.
const router= require('express').Router()

// NOTE import controller yg dibutuhkan
const {user}= require('../controllers')

// NOTE create router nya
// NOTE pakai post bisa semua, mau diganti get, post, put, patch, delet bisa juga
router.post('/getUser', user.getUser)
router.post('/login', user.login)
router.post('/register', user.register)
router.post('/edit/:index', user.edit)
router.post('/delete/:index', user.delete)

// NOTE export router
module.exports= router