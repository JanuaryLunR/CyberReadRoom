import React from 'react'
import { Link } from 'react-router-dom'

export const BooksList = ({books}) => {
  if (!books.length) {
    return <p className='center'>Your library is empty</p>
  }

  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>Title</th>
          <th>author</th>
          <th>genre</th>
          <th>ageRating</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        { books.map(book => {
          return (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.ageRating}</td>
              <td>
                <Link to={`/BookPage/${book._id}`}> Open </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    
  )
}
