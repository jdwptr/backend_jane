// NOTE import module express beserta method Router nya
// NOTE method router dari express, berguna untuk membuat router.
const router= require('express').Router()

// NOTE import controller yg dibutuhkan
const {product}= require('../controllers')

// NOTE create router nya
// NOTE pakai post bisa semua, mau diganti get, post, put, patch, delete bisa juga
router.post('/getProd', product.getProd)
router.post('/item/:index', product.item)
router.post('/add', product.addProd)
router.post('/edit/:index', product.editProd)
router.post('/delete/:index', product.deleteProd)

// NOTE export router
module.exports= router