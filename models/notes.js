const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [
      true, "Title is Required"
    ],
    minlength: [5, "Title must be minimum 5 Character"],
    maxlength: [30, "Titile Must be less then 30 Character"]
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
    minlength: [10, "Description must be minimum 10 Character"],
    maxlength: [150, "Description Must be less then 150 Characters"]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
    timestamps: true
  })

// const notesSchema = new mongoose.Schema({
//   title: String,
//   description: String
// }, {
//     timestamps: true
//   })


const Note = mongoose.model('Note', notesSchema)

module.exports = Note