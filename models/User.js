const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  library: [{ type: Types.ObjectId, ref: 'Library' }],
  role: {type: String}
})

// Сюда потом добавлю всё из базы User

module.exports = model ('User', schema)