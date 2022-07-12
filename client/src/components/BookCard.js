import React, {useContext, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const BookCard = ({book}) => {
  const {token, userId} = useContext(AuthContext)
  const {request} = useHttp()
  const [newbook, setBook] = useState({title:'', author:'', genre:'', ageRating:'', text: ''})
  const navigate = useNavigate()

  const editButton = async event => {
    try {
      const data = await request('/api/lib/update', 'PUT', { reqBook: newbook }, {
      Authorization: `Bearer ${token}`})     
    } catch (e) {}
  }

  const deleteButton = async event => {
    try { 

      if (userId=== book.owner) {
        const ddata = await request(`/api/lib/delete`, 'DELETE', { reqBook: book }, {
        Authorization: `Bearer ${token}`})
        navigate(`/LibPage`)
      } else {
        console.log(`Error! You can not delete not your book`)
        navigate(`/LibPage`)
      }

    } catch (e) {}
  }

  const readButton = async event => {
    try {
      navigate(`/Read/${book._id}`)
      
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

      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea id="text" onChange={onChange} className="materialize-textarea"></textarea>
              <label htmlFor="textarea1">Textarea</label>
            </div>
          </div>
        </form>
      </div>
      <a className="waves-effect waves-light btn-large" onClick={editButton}>Button</a>
      <a className="waves-effect waves-light btn-large" onClick={deleteButton}>Delete</a>
      <a className="waves-effect waves-light btn-large" onClick={readButton}>Read</a>
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