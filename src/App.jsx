import { useEffect, useState } from 'react'
import store from '../database/books.js'
import './App.css'

const resetForm = {
  title: '',
  author: '',
  state: 'off stock'
}

function App() {
  const [books, setBooks] = useState(store)
  const [newBook, setNewBook] = useState('')
  const [filterStore, setFilterStore] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    const filterStore = books.filter((book => book.title.toLowerCase().includes(search.toLowerCase())))
    setFilterStore(filterStore)


  }, [books, search])

  const [formData, setFormdata] = useState(resetForm)



  function addBook(e) {
    e.preventDefault()
    const newBook = {
      id: Date.now(),
      ...formData
    }
    console.log(newBook);

    const newBooks = [newBook, ...books]
    setBooks(newBooks)
    setNewBook('')
  }
  function handleForm(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormdata({
      ...formData,
      [e.target.name]: value
    })
  }

  function deleteBook(e) {
    const dataIndex = e.target.getAttribute('data-index')
    const updatebooks = books.filter((item) => item.id != dataIndex)
    setBooks(updatebooks)
  }
  function modifyBook(e) {
    const dataIndex = e.target.getAttribute('data-index')
    const updatebooks = books.filter((item) => item.id != dataIndex)
    const modifyBook = {
      id: books.find((item) => item.id == dataIndex).id,
      title: prompt(`modify title:${books.find((item) => item.id == dataIndex).title}`),
      author: prompt(`modify author: ${books.find((item) => item.id == dataIndex).author}`),
      state: prompt(`modify state: ${books.find((item) => item.id == dataIndex).state}`)
    }

    const modifyList = [modifyBook, ...updatebooks]
    setBooks(modifyList)
  }

  return (
    <>
      <header>
        <h1>titolo</h1>
      </header>
      <main>
        <button type='button' popovertarget='off-canvas-form'>+ Add</button>
        <div id="off-canvas-form" popover='true' >
          <h3>add new book</h3>
          <button type='button' popovertarget='off-canvas-form' popovertargetaction='hide'>Close</button>
          <form onSubmit={addBook}>
            <div className="row">
              <label htmlFor="book">add Book</label>
            </div>
            <div className="inputs">
              <label htmlFor="title">Title</label>
              <input type="text" name='title' id='title' value={formData.title} onChange={handleForm} placeholder='title' required />
              <label htmlFor="author">Author</label>
              <input type="text" name='author' id='author' value={formData.author} onChange={handleForm} placeholder='author' required />
              <label htmlFor="state">State in Stock</label>
              <input type="checkbox" name='state' id='state' value={formData.state} onChange={handleForm} />

              <button type='submit'>Save</button>
            </div>

          </form>

        </div>
        <input type="search" placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
        <ul>
          {filterStore.map((book, index) => (
            <li key={book.id}>
              <span>{book.title}</span>
              <button data-index={book.id} onClick={modifyBook}>Modify</button>
              <button data-index={book.id} onClick={deleteBook}>Delete</button>

            </li>
          ))}
        </ul>
      </main>


    </>
  )
}

export default App
