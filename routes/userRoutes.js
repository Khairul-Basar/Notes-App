const express = require('express')

const router = express.Router()

const { check } = require('express-validator')

// Middleware
const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')

// CONTROLLER
const { addUserController,
  getUsersController,
  getUserController,
  loginController,
  logoutController } = require('../controllers/userController')

router.get('/', [auth, admin], getUsersController)




router.get('/me', auth, getUserController)




router.post('/',
  [
    check('firstName', 'FirstName is Required. FirstName Not Empty')
      .notEmpty(),
    check('lastName', 'LastName is Required. LastName Not Empty')
      .notEmpty(),
    check('email', 'Email is Required. Email Not Empty')
      .notEmpty(),
    check('email', 'Email Must be Valid..!!').isEmail(),
    check('password', 'Password is Required. Password Not Empty.')
      .notEmpty(),
    check('password', 'Password Must be 6 Character Long')
      .isLength({ min: 6 }),
    check('password').custom((value) => {
      if (value.includes('password')) {
        throw new Error("Password Not Contain 'password'")
      } else {
        return true
      }
    }),
    check('confirmPassword', 'Confirm-Password is Required. Confirm-Password Not Empty.')
      .notEmpty(),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Comfirm Password don't Match")
      } else {
        return true
      }
    })
  ],
  addUserController)


router.post('/login', loginController)



router.post('/logout', auth, logoutController)


module.exports = router