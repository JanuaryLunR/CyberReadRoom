const {Router} = require('express')
const Book = require('../models/Book')
const auth = require('../middleware/auth.middleware.js')
const router = Router()

router.post('/create', auth, async (req, res) => {
  try {
    const {reqBook} = req.body

    const existing = await Book.findOne({ title: reqBook.title, author: reqBook.author })

    if (existing) {
      return res.json( { success: false, message: `${reqBook.title} by ${reqBook.author} already exist`})
    }

    const book = await Book.create({
      ...reqBook, owner: req.user.userId
    })

    /* верхняя строка заменяет следующие две
    const book = new Book({
      ...reqBook, owner: req.user.userId
    })
    await book.save()
    */

    res.status(201).json({ book })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


router.get('/a', async (req, res) => {
  try {
    const abooks = await Book.find()
    res.json(abooks)
  
  } catch (e) {
    res.status(500).json({ message: '/a Request broke =('})
  }
})


// User Lib
router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.userId })
    res.json(books)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    res.json(book)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ыфвфывф' })
  }
})

// router put или patch
router.put('/update', auth, async (req, res) => {
  console.log(req.body)
  try {
    const {reqBook} = req.body
    const book = await Book.updateOne(
      {_id : reqBook._id},
      {$set: 
        {"ageRating": reqBook.ageRating,
         "title": reqBook.title,
         "author": reqBook.author,
         "genre": reqBook.genre,
         "text": reqBook.text
        }}
    )
    res.status(201).json({ book })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


 router.delete('/delete', auth, async (req, res) => {
   try {
    const {reqBook} = req.body
    const book = await Book.deleteOne({_id : reqBook._id})
    res.send(book)
    // res.status(200).json({ message: 'Resource deleted successfully'})
    console.log(reqBook)
   } catch (error) {
     return res.status(500).json({ message: 'Something goes wrong (Delete)'})
   }
 })


module.exports = router