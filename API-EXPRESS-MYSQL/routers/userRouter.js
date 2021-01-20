// NOTE import module express beserta method Router nya
// NOTE method router dari express, berguna untuk membuat router.
const router= require('express').Router()

// NOTE krn pake express validator, dia middleware jd harus di import juga dissini
const { body, validationResult }= require('express-validator')

// NOTE import controller yg dibutuhkan
const {userController}= require('../controllers')

// NOTE register validation
const registerValidation= [
    body('username')
    .notEmpty()
    .withMessage('Username can\'t be empty')
    .isLength({min: 6})
    .withMessage('Username must have minimum 6 characters'),

    body('password')
    .notEmpty()
    .withMessage('Password can\'t be empty')
    .isLength({min: 6})
    .withMessage('Password must have minimum 6 characters')
    .matches(/[0-9]/)
    .withMessage('Password must have numbers')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must have symbols'),

    body('email')
    .isEmail()
    .withMessage('Invalid Email')
]

// NOTE create router nya
// NOTE pakai post bisa semua, mau diganti get, post, put, patch, delete bisa juga
router.get('/getUser', userController.getAllUser)
router.post('/login', userController.login)
router.put('/register', userController.register)
router.post('/edit/:id', userController.edit)
router.post('/edit_pass/:id', userController.editPass)
router.delete('/delete/:id', userController.deleteUser)

module.exports= router