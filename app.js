const express = require('express')
const mongoose = require('mongoose')

//import

const app = express()
const libr =  require('./routes/lib.routes')
app.use(express.json({ extended: true}))

// Пересмотреть название переменных
app.use('/api/lib', libr)

//Authorization
app.use('/api/auth', require('./routes/auth.routes'))

async function start () {
  try{
    await mongoose.connect('mongodb://127.0.0.1/CyberReadeRoom', {
      
    })
    app.listen(5000, () => console.log('App has been started.'))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit()
  }
}

start()



//npm run server