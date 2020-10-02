// MODEL
const User = require('../models/user')

// Lodash
const _ = require('lodash')

// Express Validator
const { validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')

module.exports.addUserController = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array())
  }

  const pickedProperty = _.pick(req.body, [
    'firstName',
    'lastName',
    'email',
    'password',
    'confirmPassword'
  ])

  const user = new User(pickedProperty)

  try {
    const foundOne = await User.findOne({ email: req.body.email })
    if (foundOne) return res.status(400).send("User Already Registered")


    await user.save()

    const pickedResponse = _.pick(user, [
      'firstName',
      'lastName',
      'email'
    ])

    res.send(pickedResponse)

    // res.send({
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   email: user.email
    // })

  } catch (err) {
    res.status(500).send(err)
  }


}



module.exports.getUsersController = async (req, res) => {
  try {
    const users = await User.find({}, '-password')
    res.send(users)
  } catch (err) {
    res.status(500).send(err)
  }

}



module.exports.getUserController = async (req, res) => {
  const id = req.user._id

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() })
  }

  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).send("User Not Registered..!!")
    res.send(user)
  } catch (err) {
    res.status(500).send(err)
  }



}




// module.exports.loginController = async (req, res) => {
//   const { email, password } = req.body
//   try {
//     // check Email
//     const user = await User.findOne({ email: email })
//     if (!user) return res.status(400).send("Unable to Login")
//     // check Password
//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) return res.status(400).send("Unable to Login")
//     //Logged in
//     res.send("Success...!!!")
//   } catch (err) {
//     res.status(500).send(err)
//   }

// }

module.exports.loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    // Check Email
    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).send("Unable to Login")
    // check Password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).send("Unable to Login...!!")

    // Successfully Login
    // Generate Token

    // const token = user.generateAuthToken()
    // send as Header
    // res.header('x-auth-token', token)

    // send as Cookie
    // res.cookie('auth', token, {
    //   httponly: true,
    //   sameSite: true,
    //   signed: true,
    //   maxAge: 4 * 60 * 60 * 1000

    // })

    // console.log(token)


    const token = user.generateAuthToken()
    // res.header('x-auth-token', token)
    res.cookie('auth', token, {
      httponly: true,
      sameSite: true,
      signed: true,
      maxAge: 4 * 60 * 60 * 1000
    })

    res.send("Login Successfully..!!")
  } catch (err) {
    res.status(500).send(err)
  }

}



module.exports.logoutController = (req, res) => {
  res.clearCookie('auth')
  res.send("Successfully LogOut..!!!")
}