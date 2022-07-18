import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { useParams } from 'react-router-dom'
import {Loader} from '../components/Loader'

export const Read = (props) => {
  const {request, loading} = useHttp()
  const bookId = useParams().id
  const [book, setBook] = useState(null)
  const [chapter, setChapter] = useState(1)

  const getBook = useCallback ( async () => {
    try {
      const fetched = await request(`/api/lib/${bookId}`, 'GET', null)
      setBook(fetched)
    } catch (e) {}
  }, [bookId, request])

  useEffect( () => {
    getBook()
  }, [getBook])

  if (loading) {
    return <Loader />
  }

  const onPaginationClick = (e) => {
    let elem = document.getElementsByClassName("active");
    elem[0].classList.remove("active")
    elem.className = "waves-effect"
    e.target.parentElement.className = "active"
    let active = e.target.textContent;
    setChapter(active)
    let textInput = document.getElementById("text")
    textInput.value = book.text[chapter-1].content    
  }

  return (
    <>
      { !loading && book && 
      <div className='container'>
        <div className='row'>
          <h1 id="text">{book.text[chapter-1].content}</h1>
        </div>
        <div className='row'>
          <ul className="pagination centered">
            <li className="disabled "><a href="#!">{`<`}</a></li>
            <li className="active" onClick={onPaginationClick}><a href="#!">1</a></li>
            <li className="waves-effect" onClick={onPaginationClick}><a href="#!">2</a></li>
            <li className="waves-effect"><a href="#!">{`>`}</a></li>
          </ul>
        </div>
      </div>}
    </>
  )
}