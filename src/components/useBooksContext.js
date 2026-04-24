import { useContext } from 'react'
import { BooksContext } from './booksContext.js'

function useBooksContext() {
  const context = useContext(BooksContext)

  if (!context) {
    throw new Error('useBooksContext must be used inside BooksProvider')
  }

  return context
}

export { useBooksContext }
