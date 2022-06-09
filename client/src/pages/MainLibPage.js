import React, {useCallback, useEffect, useState} from 'react'
import {Loader} from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import { BooksList } from '../components/BooksList'

export const MainLibPage = () => {
  const [books, setBooks] = useState([])
  const {loading, request} = useHttp()

  const fetchBooks = useCallback( async () => {
    try {
      const fetched = await request('/api/lib/a', 'GET')
      setBooks(fetched)
    } catch (e) {}
  }, [request])

  useEffect( () => {
    fetchBooks()
  }, [fetchBooks])

  if (loading) {
    return <Loader />
  }


  return (
    <>
      {!loading && <BooksList books={books} />}
    </>
  )
}
