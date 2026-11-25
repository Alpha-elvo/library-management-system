import { useEffect, useState } from 'react'

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value)
    }, 400)

    return () => clearTimeout(timeout)
  }, [value, onSearch])

  return (
    <input
      type="search"
      value={value}
      placeholder="Search books or authors..."
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

export default SearchBar
