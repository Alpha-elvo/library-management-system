import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchBook() {
      setLoading(true)
      setError('')

      try {
        const response = await api.get(`/books/${id}`, {
          signal: controller.signal,
        })

        setBook(response.data)
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError('Unable to load this book.')
          console.error(err)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchBook()

    return () => controller.abort()
  }, [id])

  if (loading) return <p>Loading book details...</p>

  if (error) return <p role="alert">{error}</p>

  if (!book) return <p>Book not found.</p>

  return (
    <main>
      <Link to="/">← Back to catalog</Link>

      <article>
        <h1>{book.title}</h1>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre?.name || 'Uncategorized'}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Published:</strong> {book.publishedYear}</p>
        <p><strong>Total copies:</strong> {book.totalCopies}</p>
      </article>
    </main>
  )
}

export default BookDetail
