const express = require('express')
// Cross Origin Resource Sharing{cors}
const cors = require('cors')

const app = express()

// const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const notesRoute = require('./routes/notesRoutes')
const homeRoute = require('./routes/index')
const userRoute = require('./routes/userRoutes')
// Error Middleware
const { error } = require('./middleware/error')



// Config
require('dotenv').config({
  path: './config/keys.env'
})



// Middleware
app.use(express.json())

app.use(cookieParser(process.env.COOKIES_SECRET_KEY))

// enable Cors
app.use(cors())


// app.use(auth)



// Database

// No SQL Database Structure

// Collection
//   document
//     data

// notes
//   note
//     id:
//     title:
//     description:

//   note
//     id:
//     description:

//   note
//     title:
//     description:


// Connecting Database

const { connectDB } = require('./db/dbConnection')

connectDB()



// HANDLING ROUTES
app.use('/notes', notesRoute)
app.use('/users', userRoute)
app.use('/', homeRoute)
app.use(error)

// let notes = [
//   {
//     id: 1,
//     title: "Note title 1",
//     description: "Note Description 1"
//   },
//   {
//     id: 2,
//     title: "Note title 2",
//     description: "Note Description 2"
//   }
// ]







// Get All Notes
// app.get('/notes', async (req, res) => {
//   // try {

//   //   if (notes.length === 0) {
//   //     res.send("No Notes Available")
//   //   }
//   //   res.send(notes)

//   // } catch (err) {
//   //   res.status(500).send("Internal Server Error...!!")
//   // }

//   try {

//     const notes = await Note.find()
//     res.send(notes)

//   } catch (err) {
//     res.status(500).send("Internal Server Error..!!")
//   }

// })













// Get Single Notes
// app.get('/notes/:noteId',
//   [
//     check('noteId', 'Note Not Found').isMongoId()
//   ],
// async (req, res) => {

//   // const noteId = parseInt(req.params.noteId)
//   // const note = notes.find(note => note.id === noteId)
//   // if (note) return res.send(note)
//   // res.status(404).send("Note Not Found...!!!")






//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).send(errors.array())
//   }

//   try {

//     const id = req.params.noteId;

//     const note = await Note.findById(id)
//     if (!note) return res.status(404).send("Note Not Found")

//     res.send(note)

//   } catch (err) {
//     res.status(500).send(err)
//   }

// })






app.get('/hello/:name', (req, res) => {
  const name = req.params.name
  res.send(`Hello ${name}`)
})

app.get('/user', (req, res) => {
  const userInfo = {
    name: "Khairul Basar",
    code: "xddxasfdvdchsgdyfg323545tfrf6"
  }
  res.send(userInfo)
})






// Post Request 
// Adding Note

// app.post('/notes',
//   [
//     check('title')
//       .notEmpty()
//       .withMessage("Titile is Required....!!!")
//     // .isLength({ min: 3, max: 10 })
//     // .withMessage("Title must be 3 to 10")
//     ,

//     check('description')
//       .notEmpty()
//       .withMessage("Description is Required....!!!!")
//     // .isLength({ min: 10, max: 100 })
//     // .withMessage("Description must be 10 to 100")
//   ], async (req, res) => {

//     const errors = validationResult(req)

//     if (!errors.isEmpty()) {
//       return res.status(400).send({ errors: errors.array() })
//     }

//     try {
//       const note = new Note(req.body)
//       await note.save()
//       res.send(note)
//     } catch (err) {
//       res.status(400).send(err)
//     }

//     // notes = [...notes, note]
//     // res.send(notes)
//   })











// Update Note
// PUT Request

// app.put('/notes/:noteId',
//   [
//     check('noteId', "Note Not Found..!!").isMongoId(),
//     check('titile', "Titile is Required....!!!")
//       .optional().notEmpty(),

//     check('description', "Description is Required....!!!!")
//       .optional().notEmpty()
//   ],
// async (req, res) => {

//   // const noteId = parseInt(req.params.noteId)
//   // const noteInput = req.body;

//   // const gotNotInput = Object.keys(noteInput)
//   // const allowedUpdate = ['title', 'description']

//   // try {

//   //   const isAllowed = gotNotInput.every(update =>
//   //     allowedUpdate.includes(update)
//   //   )

//   //   if (!isAllowed) {
//   //     return res.status(400).send("Invalid Request...")
//   //   }

//   //   const note = notes.find(note => note.id === noteId)

//   //   if (note) {

//   //     notes = notes.map(note => {

//   //       if (note.id === noteId) {
//   //         return {
//   //           ...note,
//   //           ...noteInput
//   //         }
//   //       } else {
//   //         return note;
//   //       }

//   //     })

//   //     res.send(notes)

//   //   } else {
//   //     res.status(404).send("Note Not Found...!!!")
//   //   }

//   // } catch (err) {

//   //   res.status(500).send("Internal Server Error...!!!")

//   // }






//   const id = req.params.noteId

//   const gotNotInput = Object.keys(req.body)
//   const allowedUpdate = ['title', 'description']

//   const isAllowed = gotNotInput.every(update =>
//     allowedUpdate.includes(update)
//   )

//   if (!isAllowed) {
//     return res.status(400).send("Invalid Updates...")
//   }

//   const errors = validationResult(req)

//   if (!errors.isEmpty()) {
//     return res.status(400).send({ errors: errors.array() })
//   }

//   try {
//     const note = await Note.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true
//     })

//     if (!note) {
//       return req.status(404).send("Note Not Found...!!!")
//     }
//     res.send(note)
//   } catch (err) {
//     res.status(500).send("Internal Server error")
//   }


// })










// Delete Note

// app.delete('/notes/:noteId',
//   check('noteId', 'Note Not Found').isMongoId(),
// async (req, res) => {
//   // const noteId = parseInt(req.params.noteId)

//   // try {

//   //   const note = notes.find(note => note.id === noteId)

//   //   if (note) {

//   //     notes = notes.filter(note => note.id !== noteId)
//   //     res.send(notes)

//   //   } else {
//   //     res.status(404).send("Note Not Found..!!")
//   //   }

//   // } catch (err) {
//   //   res.status(500).send("Server Internal Problem...!!!")
//   // }


//   const id = req.params.noteId

//   const errors = validationResult(req)

//   if (!errors.isEmpty()) {
//     return res.status(404).send(errors.array())
//   }

//   try {
//     const note = await Note.findByIdAndDelete(id)
//     if (!note) return res.status(404).send('Note Not Found..!')
//     res.send(note)
//   } catch (err) {
//     res.status(500).send(err)
//   }


// })





const PORT = process.env.PORT || 3001



// Server Creation
app.listen(PORT, (req, res) => {
  console.log('server created port is 3001')
})

