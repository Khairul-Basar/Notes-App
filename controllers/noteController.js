// EXPRESS VALIDATOR
const { validationResult } = require('express-validator')

// MODEL
const Note = require('../models/notes')



// ADD NOTE CONTROLLER
module.exports.addNoteController = async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  try {
    const note = new Note({
      ...req.body,
      owner: req.user._id
    })
    await note.save()
    res.send(note)
  } catch (err) {
    res.status(500).send(err)
  }

}



// GET SINGLE NOTE CONTROLLER
module.exports.getNoteController = async (req, res) => {
  const id = req.params.noteId

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  try {
    const note = await Note.findById(id).populate('owner', 'firstName lastName')
    if (!note) return res.status(404).send("Note Not Found..!!")
    res.send(note)
  } catch (err) {
    res.status(500).send(err)
  }

}



// GET ALL NOTES CONTROLLER
module.exports.getNotesController = async (req, res) => {
  try {
    const notes = await Note.find().populate('owner', 'firstName lastName')
    if (!notes) return res.status(404).send("Note Not Found..!!")
    res.send(notes)
  } catch (err) {
    res.status(500).send(err)
  }
}




// UPDATE NOTE CONTROLLER
module.exports.updateNoteController = async (req, res) => {
  const id = req.params.noteId

  const gotNoteInputkeys = Object.keys(req.body)
  const updateAllowed = ['title', 'description']
  const isAllowed = gotNoteInputkeys.every(update =>
    updateAllowed.includes(update)
  )

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  if (!isAllowed) {
    return res.status(400).send('Invalid Requests.')
  }

  try {
    const note = await Note.findOneAndUpdate({
      _id: id,
      owner: req.user._id
    }, req.body, {
        new: true,
        runValidators: true
      })

    if (!note) return res.status(404).send('Note Not Found..!!')
    res.send(note)
  } catch (err) {
    res.status(500).send(err)
  }


}




// DELETE NOTE CONTROLLER
module.exports.deleteNoteController = async (req, res) => {
  const id = req.params.noteId

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }

  try {
    const note = await Note.findOneAndDelete({
      _id: id,
      owner: req.user._id
    })
    if (!note) return res.status(404).send('Note Not Found..!!')
    res.send(note)
  } catch (err) {
    res.status(500).send(err)
  }

}

