import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons, newFilter}) => {
  return (
    <>
      {persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())).map((p, i) => <Person key={i} person={p} />)}
    </>
  )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNewNumber}) =>
{
  return (
    <form onSubmit={addName}>
      <div>
        <h2>add a new</h2>
        name: <input value={newName} onChange={handleNameChange} />
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

function Filter({newFilter, handleNewFilter}) {
  return (
      <p>filter shown with <input value={newFilter} onChange={handleNewFilter}></input></p>
  )
}

const App = () => {

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      }
      )
    }, []
  )

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  function addName(e) {
    e.preventDefault();
    const newPerson = {name: newName, number: newNumber}
    if (persons.some(p => p.name === newPerson.name)) {
      alert(`${newPerson.name} is alrady in the phone book!`);
    } else {
      const newPersons = persons.concat(newPerson);
      setPersons(newPersons);
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNewNumber = e => setNewNumber(e.target.value)
  const handleNewFilter = e => setNewFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App