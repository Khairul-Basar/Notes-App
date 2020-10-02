const jwt = require('jsonwebtoken')

// Models
const User = require('../models/user')

module.exports.auth = async (req, res, next) => {
  if (req.signedCookies) {
    // accessing cookies
    const token = req.signedCookies['auth']

    try {
      // verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      // console.log(decoded)
      // Getting User
      const user = await User.findById(decoded.id)
      req.user = user
      next()
    } catch (err) {
      res.status(401).send("Unauthorized Access")
    }

  } else {
    res.status(401).send("No Token Provided or Unauthorized")
  }

}