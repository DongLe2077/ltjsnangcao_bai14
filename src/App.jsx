import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:3001/books'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  // Fetch all books
  const fetchBooks = async () => {
    const res = await axios.get(API_URL)
    setBooks(res.data)
  }

  useEffect(() => {
    let ignore = false

    axios.get(API_URL).then((res) => {
      if (!ignore) {
        setBooks(res.data)
      }
    })

    return () => {
      ignore = true
    }
  }, [])

  // Create book
  const createBook = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await axios.post(API_URL, { title })
    setTitle('')
    fetchBooks()
  }

  // Delete book by id
  const deleteBookById = async (id) => {
    await axios.delete(`${API_URL}/${id}`)
    fetchBooks()
  }

  // Start editing
  const startEdit = (book) => {
    setEditingId(book.id)
    setEditTitle(book.title)
  }

  // Edit book by id
  const editBookById = async (id) => {
    if (!editTitle.trim()) return
    await axios.put(`${API_URL}/${id}`, { title: editTitle })
    setEditingId(null)
    setEditTitle('')
    fetchBooks()
  }

  return (
    <div className="app">
      <h1>Reading List</h1>

      <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-actions">
              <button className="btn-edit" onClick={() => startEdit(book)} title="Edit">
                ✎
              </button>
              <button className="btn-delete" onClick={() => deleteBookById(book.id)} title="Delete">
                ✕
              </button>
            </div>
            <img
              src={`https://picsum.photos/seed/${book.id}/300/200`}
              alt={book.title}
              className="book-image"
            />
            {editingId === book.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => editBookById(book.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <p className="book-title">{book.title}</p>
            )}
          </div>
        ))}
      </div>

      <div className="add-book-section">
        <h2>Add a Book</h2>
        <form onSubmit={createBook}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Create!</button>
        </form>
      </div>
    </div>
  )
}

export default App
