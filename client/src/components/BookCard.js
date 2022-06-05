import React from 'react'

export const BookCard = ({ book }) => {
  return (
    <>
     <h1>Title: {book.title}</h1> 
     <h2>Author: {book.author}</h2>
     <h2>Genre: {book.genre}</h2>
     <h2>Rating: {book.rating}</h2>
     <h2>Age: {book.ageRating}</h2>
    </>
  )
}

/*
title: {type: String, required: true},
author: {type: String, required: true},
genre: {type: String, required: true },
rating: {type: Number},
bookid: {type: String, required: true, unique: true},
ageRating: {type: Number},
owner: {type: Types.ObjectId, ref: 'User'}
*/