import React, {useContext, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Alert } from './Alert'

export const BookCard = ({getBook}) => {
  const {token, userId} = useContext(AuthContext)
  const {request} = useHttp()
  const [book, setBook] = useState(getBook)
  const [chapter, setChapter] = useState(1)
  const navigate = useNavigate()

  const editButton = async event => {
    try {
      const data = await request(`/api/lib/${book._id}`, 'PUT', { reqBook: book }, {
      Authorization: `Bearer ${token}`})
      console.log(data)     
    } catch (e) {}
  }

  const deleteButton = async event => {
    try { 

      if (userId=== book.owner) {
        const ddata = await request(`/api/lib/delete`, 'DELETE', { reqBook: book }, {
        Authorization: `Bearer ${token}`})
        Alert.showAlert('Book Removed!', 'success')
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

  const onChange = (e) => {
    if ([e.target.id] == "text") {
      setBook({...book, text: { ...book.text, [chapter]: { ...book.text[chapter], content : e.target.value } }})
    } else {
      setBook({...book, [e.target.id]: e.target.value})
    }
  }

  // Chapter
  const onAddChpClick = async event => {

  }


  return (
    <>
     <h1>Title: {book.title}</h1>
     { userId=== book.owner && <input id="title" onChange={onChange} value={book.title} type="text" className="validate"/> }
     { userId=== book.owner &&           <label htmlFor="title">Title of book: </label> }
     <h2>Author: {book.author}</h2>
     { userId=== book.owner && <input id="author" onChange={onChange} value={book.author} type="text" className="validate" /> }
     { userId=== book.owner &&            <label htmlFor="author">Author name</label> }
     <h2>Genre: {book.genre}</h2>
     { userId=== book.owner && <input id="genre" onChange={onChange} value={book.genre} type="text" className="validate" /> }
     { userId=== book.owner &&            <label htmlFor="genre">Genre of book</label> }
     <h2>Rating: {book.rating}</h2>
     <h2>Age: {book.ageRating}</h2>
     { userId=== book.owner && <input id="ageRating"  onChange={onChange} value={book.ageRating} type="text" className="validate"/> }
     { userId=== book.owner && <label htmlFor="ageRating">Age rating</label> }

     <form className="col s12">
       <div className="row">
         <div className="input-field col s12">
           <textarea id="text" onChange={onChange} className="materialize-textarea" value={book.text.content}></textarea>
           <label htmlFor="textarea1">Textarea</label>
         </div>
       </div>
     </form>

    {/* chapter */}
     <ul className="pagination">
       <li className="active"><a href="#!">1</a></li>
       <li className="waves-effect"><a href="#!">2</a></li>
       <li className="waves-effect"><a href="#!" onClick={onAddChpClick} className='waves-effect waves-light green'>+</a></li>
     </ul>

     <div className='row'>
      { userId=== book.owner && <a className="waves-effect waves-light btn-large col s4" onClick={editButton}>Change</a> }
      { userId=== book.owner && <a className="waves-effect waves-light btn-large col s4" onClick={deleteButton}>Delete</a> }
      <a className="waves-effect waves-light btn-large col s4" onClick={readButton}>Read</a>
      </div>
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