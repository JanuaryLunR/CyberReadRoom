import React, {useContext, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Accordion from '../components/Accordion'

export const BookCard = ({book}) => {
  const {token, userId} = useContext(AuthContext)
  const {request} = useHttp()
  const [newbook, setBook] = useState({title:'', author:'', genre:'', ageRating:'', text: ''})
  const navigate = useNavigate()
  const [count, setCount] = useState(0);

  const editButton = async event => {
    try {
      const data = await request('/api/lib/update', 'PUT', { reqBook: newbook }, {
      Authorization: `Bearer ${token}`})     
    } catch (e) {}
  }

  /* unrealized idea for hide/display elements
  function isOwner () {
    if (userId === book.owner) {
      return true;
    }
    else {
      return false;
    }
  } */

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
     { userId=== book.owner && <input id="title" onChange={onChange} type="text" className="validate"/> }
     { userId=== book.owner &&           <label htmlFor="title">Title of book: </label> }
     <h2>Author: {book.author}</h2>
     { userId=== book.owner && <input id="author" onChange={onChange} type="text" className="validate" /> }
     { userId=== book.owner &&            <label htmlFor="author">Author name</label> }
     <h2>Genre: {book.genre}</h2>
     { userId=== book.owner && <input id="genre" onChange={onChange} type="text" className="validate" /> }
     { userId=== book.owner &&            <label htmlFor="genre">Genre of book</label> }
     <h2>Rating: {book.rating}</h2>
     <h2>Age: {book.ageRating}</h2>
     { userId=== book.owner && <input id="ageRating"  onChange={onChange} type="text" className="validate"/> }
     { userId=== book.owner &&            <label htmlFor="ageRating">Age rating</label> }

     <Accordion 
        title={"Chapter" + count}
        //{setCount(count +1)}
        content={`<form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea id="text" onChange={onChange} className="materialize-textarea"></textarea>
                      <label htmlFor="textarea1">Textarea</label>
                    </div>
                  </div>
                </form>`}
     />
     <Accordion 
        title="StasSAO"
        content="SecretKFCBullshit"
     />

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