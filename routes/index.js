const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
  res.send("Welcome to note App. Here You can manage Your Note.")
})


router.get('*', (req, res) => {
  res.status(404).send("404 NOt Found...!!!!")
})


module.exports = router