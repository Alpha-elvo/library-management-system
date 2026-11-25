import { Link } from 'react-router-dom'

function BookCard({ book }) {
  return (
    <article>
      <h2>{book.title}</h2>
      <p>By {book.author}</p>
      <p>Genre: {book.genre?.name || 'Uncategorized'}</p>

      <Link to={`/books/${book.id}`}>
        View details
      </Link>
    </article>
  )
}

export default BookCard
