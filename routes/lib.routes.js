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

module.exports = router