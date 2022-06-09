import React, {useContext, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const BookCard = ({book}) => {
  const {token} = useContext(AuthContext)
  const {request} = useHttp()
  const [newbook, setBook] = useState({title:'', author:'', genre:'', ageRating:''})
  const navigate = useNavigate()

  const editButton = async event => {
    try {
      const data = await request('/api/lib/update', 'PUT', { reqBook: newbook }, {
      Authorization: `Bearer ${token}`})     
    } catch (e) {}
  }

  const deleteButton = async event => {
    try { 
      console.log(book)
      const ddata = await request(`/api/lib/delete`, 'DELETE', { reqBook: book }, {
        Authorization: `Bearer ${token}`})
        navigate(`/LibPage`)
    } catch (e) {}
  }

  const onChange = (e) => 
    setBook({...book, [e.target.id]: e.target.value})


  return (
    <>
     <h1>Title: {book.title}</h1>
     <input id="title" onChange={onChange} type="text" className="validate"/>
                <label htmlFor="title">Title of book: </label> 
     <h2>Author: {book.author}</h2>
     <input id="author" onChange={onChange} type="text" className="validate" />
                <label htmlFor="author">Author name</label>
     <h2>Genre: {book.genre}</h2>
     <input id="genre" onChange={onChange} type="text" className="validate" />
                <label htmlFor="genre">Genre of book</label>
     <h2>Rating: {book.rating}</h2>
     <h2>Age: {book.ageRating}</h2>
     <input id="ageRating"  onChange={onChange} type="text" className="validate"/>
                <label htmlFor="ageRating">Age rating</label>

      <a className="waves-effect waves-light btn-large" onClick={editButton}>Button</a>
      <a className="waves-effect waves-light btn-large" onClick={deleteButton}>Delete</a>
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