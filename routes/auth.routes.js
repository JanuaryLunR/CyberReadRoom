const {Router} = require ('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/
// JOI потом посмотреть вместо валидатора

// /api/auth/register
router.post(
  '/register',
  // This is express-validator, here we check input register data: email and password 
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Wrong password(min 6 symb)').isLength({min:6})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Wrong Register inputs'
      })
    }

    // Деструктуризация, почитать
    // Spread operator, почитать
    const {email, password} = req.body

    // Check if already registered
    const candidate = await User.findOne({ email: email})
    

    if (candidate) {
      return res.status(400).json({ message: 'Email already in use'})
    }

    // Continue registration
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({email: email, password: hashedPassword})

    res.status(201).json({ message: 'User created'})


  } catch (e) {
    res.status(500).json({message: 'Error, try again'})
  }
})

// /api/auth/login
router.post(
  '/login', 
  [
    check('email', 'Check your email').normalizeEmail().isEmail(),
    check('password', 'Write your password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Wrong Login inputs'
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({ email })

      //Searching for user
      if (!user) {
        return res.status(400).json({message: 'User not found'})
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Wrong login or password!'})
        // We checking only password, but for security we didn't tell is login exist
        // чтобы злоумышленник не стал подбирать пароль к чужому логину
      }

      // Here we already know, that email and password correct, we shoul authorization user
      //jsonwebtoken      
      const token = jwt.sign(
        { userId: user.id },
        //jwt SecretKey
        "KFCBucket",
        { expiresIn: '1h' }
      )

      res.status(200).json({ token, userId: user.id })      
    } catch (e)
    {
      res.status(500).json({message: 'Error, try again'})
    }

})

module.exports = router

/* Spread operator
const objectA = { a: "123"}
const objectB = { b: "321"}

const objectC = { ...objectA, ...objectB }
*/