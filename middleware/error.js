module.exports.error = (err, req, res, next) => {
  res.status(500).send("Something Happend on the Server")
}