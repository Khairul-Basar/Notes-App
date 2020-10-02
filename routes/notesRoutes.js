const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

// MiddelWare
const { auth } = require('../middleware/auth')

// CONTROLLER
const { addNoteController,
  getNoteController,
  getNotesController,
  updateNoteController,
  deleteNoteController } = require('../controllers/noteController')



// GET ALL NOTES ROUTE
router.get('/', getNotesController)




// GET SINGLE NOTE ROUTE
router.get('/:noteId',
  [
    check('noteId', 'Note Not Found..!!!!').isMongoId()
  ], getNoteController)





// ADD NOTE ROUTE
router.post('/',
  [
    auth,
    check('title', 'Title is Required. Title Not Empty')
      .notEmpty(),

    check('description', 'Description is Required. Description Not Empty')
      .notEmpty()
  ], addNoteController)






// UPDATE NOTE ROUTE
router.put('/:noteId',
  [
    auth,
    check('noteId', 'Note Not Found..!!').isMongoId(),
    check('title', 'Title is Required. Title Not Empty.')
      .notEmpty()
      .optional(),

    check('description', 'Description is Required.Description Not Empty')
      .notEmpty()
      .optional()
  ], updateNoteController)




// DELETE NOTE ROUTE
router.delete('/:noteId',
  [
    auth,
    check('noteId', 'Note Not Found').isMongoId()
  ], deleteNoteController)




module.exports = router