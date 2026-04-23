import axios from 'axios'
import { useState, useEffect } from 'react'

const country_url = 'https://studies.cs.helsinki.fi/restcountries/'

const Countries = ({countries}) => {
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h2>Languages</h2>
      {Object.values(country.languages).map(l => <p key={l}>{l}</p>)}
      <img src={country.flags.png } />
      </>
    )
  } else if (countries.length < 10) {
    return (
        <div>{countries.map((c, i) => <p key={i}>{c.name.common}</p>)}</div>
    )
  } else {
    return <div>Too many matches, specify another filter.</div>
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ displayed, setDisplayed ] = useState([])
  const [ searchText, setSearchText ] = useState("")

  useEffect(() => {
  axios.get(`${country_url}/api/all`)
  .then(req => {
    setCountries(req.data)
    setDisplayed(req.data)
  })
  }, [])

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    setDisplayed(countries.filter(c => c.name.common.toLowerCase().includes(e.target.value)))
  }
  
  return ( 
    <>
    <div>Find countries: <input value={searchText} onChange={handleSearchText}></input></div>

    <Countries countries={displayed} />
    </>
  )
}

export default App