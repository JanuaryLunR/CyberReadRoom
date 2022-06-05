const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  bookid: {type: String, required: true, unique: true},
  status: {type: String, required: true},
  progress: {type: String, required: true },
  grade: {type: Number}
})

module.exports = model ('Library', schema)