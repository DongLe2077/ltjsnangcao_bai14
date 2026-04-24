import { useEffect, useState } from 'react'
import axios from 'axios'
import { BooksContext } from './booksContext.js'

const API_URL = 'http://localhost:3001/books'

function BooksProvider({ children }) {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL)
      setBooks(res.data)
    } catch (error) {
      console.error('Fetch books failed:', error)
    }
  }

  useEffect(() => {
    let ignore = false

    axios
      .get(API_URL)
      .then((res) => {
        if (!ignore) {
          setBooks(res.data)
        }
      })
      .catch((error) => {
        console.error('Initial load failed:', error)
      })

    return () => {
      ignore = true
    }
  }, [])

  const createBook = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    try {
      await axios.post(API_URL, { title })
      setTitle('')
      await fetchBooks()
    } catch (error) {
      console.error('Create book failed:', error)
    }
  }

  const deleteBookById = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await fetchBooks()
    } catch (error) {
      console.error('Delete book failed:', error)
    }
  }

  const startEdit = (book) => {
    setEditingId(book.id)
    setEditTitle(book.title)
  }

  const editBookById = async (id) => {
    if (!editTitle.trim()) {
      return
    }

    try {
      await axios.put(`${API_URL}/${id}`, { title: editTitle })
      setEditingId(null)
      setEditTitle('')
      await fetchBooks()
    } catch (error) {
      console.error('Edit book failed:', error)
    }
  }

  const valueToShare = {
    books,
    title,
    editingId,
    editTitle,
    setTitle,
    setEditingId,
    setEditTitle,
    fetchBooks,
    createBook,
    deleteBookById,
    startEdit,
    editBookById,
  }

  return <BooksContext.Provider value={valueToShare}>{children}</BooksContext.Provider>
}

export { BooksProvider }
