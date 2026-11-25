import { useEffect, useState } from 'react'
import api from '../api'

function GenreFilter({ genreId, onGenreChange }) {
  const [genres, setGenres] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await api.get('/genres')
        setGenres(response.data)
      } catch (err) {
        setError('Unable to load genres.')
        console.error(err)
      }
    }

    fetchGenres()
  }, [])

  return (
    <div>
      <label htmlFor="genre">Filter by genre:</label>

      <select
        id="genre"
        value={genreId}
        onChange={(event) => onGenreChange(event.target.value)}
      >
        <option value="">All Genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {error && <p role="alert">{error}</p>}
    </div>
  )
}

export default GenreFilter
