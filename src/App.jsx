import './App.css'
import { useBooksContext } from './components/useBooksContext.js'

function App() {
  const {
    books,
    title,
    editingId,
    editTitle,
    setTitle,
    setEditingId,
    setEditTitle,
    createBook,
    deleteBookById,
    startEdit,
    editBookById,
  } = useBooksContext()

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
