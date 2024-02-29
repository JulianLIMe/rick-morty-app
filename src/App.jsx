import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [characters, setCharacters] = useState([])
  const [q, setQ] = useState('')
  const [searchParam] = useState(['name'])
  const [filterChars, setFilterChars] = useState("ALL")

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://rickandmortyapi.com/api/character')
      const data = await response.json()
      const response2 = await fetch('https://rickandmortyapi.com/api/character/?page=2')
      const data2 = await response2.json()
      const characters = [...data.results, ...data2.results]
      //console.log(characters)
      setCharacters(characters)
    }
    fetchData()
  }, [])

  function handleSearch(chars) {
    return chars.filter((char) => {
      if (char.species === filterChars) {
        return searchParam.some((param) => {
          return char[param].toLowerCase().includes(q.toLowerCase())
        })
      } else if (filterChars === "ALL") {
        return searchParam.some((param) => {
          return char[param].toLowerCase().includes(q.toLowerCase())
        })
      }
    })
  }

  return (
    <>
      <h1>Rick and Morty</h1>

      <div className='searchBar'>
        <input
          type="search"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className='filterSpecie'>
        <select onChange={(e) => setFilterChars(e.target.value)}>
          <option value="ALL">Filter By Specie</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Poopybutthole">Poopybutthole</option>
          <option value="Mythological Creature">Mythological Creature</option>
        </select>
      </div>

      <div className='cards'>
        {
          handleSearch(characters).map((char) => (
            <div className='card' key={char.id}>
              <h2>{char.name}</h2>
              <img src={char.image} alt={char.name} />
              <div className='info'>
                <p>Status: {char.status}</p>
                <p>Speie: {char.species}</p>
                <p>Gender: {char.gender}</p>
              </div>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default App
