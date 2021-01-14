// NOTE import module express beserta method Router nya
// NOTE method router dari express, berguna untuk membuat router.
const router= require('express').Router()

// NOTE import controller yg dibutuhkan
const {productController}= require('../controllers')

// NOTE create router nya
// NOTE pakai post bisa semua, mau diganti get, post, put, patch, delete bisa juga
router.get('/getProduct', productController.getAllProd)

// NOTE export router
module.exports= router