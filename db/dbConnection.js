const mongoose = require('mongoose')

module.exports.connectDB = async () => {

  try {
    // await mongoose.connect('mongodb://localhost:27017/notes-app', {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@notes-app.8uaxa.mongodb.net/notes-app?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log("Database Connected Successfully...!!!")
  } catch (err) {
    console.log(err)
  }

}

