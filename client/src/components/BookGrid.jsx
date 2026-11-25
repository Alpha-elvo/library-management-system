import { useEffect, useState } from 'react'
import api from '../api'
import BookCard from './BookCard'

function BookGrid({ search, genreId, page, setPage }) {
  const [books, setBooks] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchBooks() {
      setLoading(true)
      setError('')

      try {
        const params = {
          page,
          limit: 10,
        }

        if (search.trim()) params.search = search.trim()
        if (genreId) params.genreId = genreId

        const response = await api.get('/books', {
          params,
          signal: controller.signal,
        })

        setBooks(response.data.data)
        setMeta(response.data.meta)
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError('Unable to load books. Please try again.')
          console.error(err)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchBooks()

    return () => controller.abort()
  }, [search, genreId, page])

  if (loading) return <p>Loading books...</p>

  if (error) return <p role="alert">{error}</p>

  if (books.length === 0) {
    return <p>No books found.</p>
  }

  return (
    <section>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </button>

          <span>
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            type="button"
            disabled={page === meta.totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}

export default BookGrid
