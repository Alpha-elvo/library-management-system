import { useCallback, useState } from 'react'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import BookGrid from '../components/BookGrid'

function HomePage() {
  const [search, setSearch] = useState('')
  const [genreId, setGenreId] = useState('')
  const [page, setPage] = useState(1)

  const handleSearch = useCallback((value) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleGenreChange = useCallback((value) => {
    setGenreId(value)
    setPage(1)
  }, [])

  return (
    <main>
      <h1>Library Catalog</h1>

      <SearchBar onSearch={handleSearch} />

      <GenreFilter
        genreId={genreId}
        onGenreChange={handleGenreChange}
      />

      <BookGrid
        search={search}
        genreId={genreId}
        page={page}
        setPage={setPage}
      />
    </main>
  )
}

export default HomePage
