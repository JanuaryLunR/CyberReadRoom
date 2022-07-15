const {Schema, model, Types} = require('mongoose')

const schema = new Schema({

  title: {type: String, required: true},
  author: {type: String, required: true},
  genre: {type: String, required: true },
  rating: {type: Number, default: 0},
  ageRating: {type: String},
  owner: {type: Types.ObjectId, ref: 'User'},
  text: { type: Object}
  /*  chapterNumber: {type: Number},
    name: {type: String},
    content: {type: String
  */
  //text: {type: String}
}, 
  {versionKey: false, timestamps: true})

module.exports = model ('Book', schema)