const jwt = require('jsonwebtoken')

// Models
const User = require('../models/user')

module.exports.admin = async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403)
    .send("You are Not Allowed to execcess..!!")
  next()
}
