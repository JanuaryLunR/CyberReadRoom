import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { useParams } from 'react-router-dom'
import {Loader} from '../components/Loader'

export const Read = () => {
  const {request, loading} = useHttp()
  const bookId = useParams().id
  const [book, setBook] = useState(null)

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

  return (
    <>
      { !loading && book && <h1>{book.text}</h1>}
    </>
  )
}
