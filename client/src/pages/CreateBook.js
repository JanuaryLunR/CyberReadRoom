import React, {useContext, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const CreateBook = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [book, setBook] = useState({title:'', author:'', genre:'', ageRating:'', text:''})
// Upload book?
  const [uploadedFile, setUploadedFile] = useState ('');
  const [fileTitle, setFileTitle] = useState ('');

  function handleFormSubmittion (e) {
    e.preventDefault ();

    let form = document.getElementById ('form');
    let formData = new FormData (form);

    // do something
    console.log("Form submitted")
  }

  function handleFileTitle (e) {
    setFileTitle (e.target.value);
  }

  function handleUploadedFile (e) {
    setUploadedFile (e.target.value);
  }

  const pressHandler = async event => {
    try {
      const data = await request('/api/lib/create', 'POST', { reqBook: book }, {
        Authorization: `Bearer ${auth.token}`
      })
      navigate(`/BookPage/${data.book._id}`)
    } catch (e) {}
  }

  const onChange = (e) => 
    setBook({...book, [e.target.id]: e.target.value})

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <form className="col s12">
            <div className="row">

              <div className="input-field col s6">
                <input id="title" value={book.title} onChange={onChange} type="text" className="validate"/>
                <label htmlFor="title">Title of book: </label>
              </div>         

              <div className="input-field col s6">
                <input id="author" value={book.author} onChange={onChange} type="text" className="validate" />
                <label htmlFor="author">Author name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input id="genre" value={book.genre} onChange={onChange} type="text" className="validate" />
                <label htmlFor="genre">Genre of book</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input id="ageRating" value={book.ageRating} onChange={onChange} type="text" className="validate"/>
                <label htmlFor="ageRating">Age rating</label>
              </div>
            </div>

            <div className="row">
            <form
              encType="multipart/form-data"
              onSubmit={handleFormSubmittion}
              id="form"
            >
              <input
                type="file"
                name="uploadedFile"
                value={uploadedFile}
                onChange={handleUploadedFile}
                required
              />
              <br />
              <br />

              <label>File title:</label><br />
              <input
                type="text"
                placeholder="Enter file title"
                name="fileTitle"
                value={fileTitle}
                onChange={handleFileTitle}
                required
              />
            </form>
            </div>

            <a className="waves-effect waves-light btn-large" onClick={pressHandler}>Button</a>
          </form>
        </div>
      </div>
    </div>
  )
}