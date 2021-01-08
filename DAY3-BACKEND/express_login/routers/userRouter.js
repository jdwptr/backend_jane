// NOTE import module express beserta method Router nya
// NOTE method router dari express, berguna untuk membuat router.
const router= require('express').Router()

// NOTE import controller yg dibutuhkan
const {user}= require('../controllers')

// NOTE import expres validator
// NOTE body kan dr postman nah dia ngecek body nya doang
const {body}= require('express-validator')

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
// NOTE pakai post bisa semua, mau diganti get, post, put, patch, delet bisa juga
router.post('/getUser', user.getUser)
router.post('/login', user.login)
router.post('/register', registerValidation, user.register)
router.post('/edit/:index', user.edit)
router.post('/delete/:index', user.delete)

// NOTE export router
module.exports= router