import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import { BooksList } from '../components/BooksList'

export const LibPage = () => {
  const [books, setBooks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchBooks = useCallback( async () => {
    try {
      const fetched = await request('/api/lib', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setBooks(fetched)

    } catch (e) {}
  }, [token, request])

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