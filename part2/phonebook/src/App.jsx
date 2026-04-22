import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'
import axios from 'axios'

const DB_URL = 'http://localhost:3001/persons'

const Person = ({person, deleteName}) => {
  return (
    <p>{person.name} {person.number} <Button deleteName={deleteName} id={person.id} /></p>
  )
}

const Persons = ({persons, newFilter, deleteName}) => {
  return (
    <>
      {persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())).map((p, i) => <Person key={i} person={p} deleteName={deleteName} />)}
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

function Button({deleteName, id}) {
  return (
    <button onClick={() => deleteName(id)}>Delete</button>
  )
}

const App = () => {

  useEffect(() => {
    console.log('effect')
    phonebook.getAll()
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
      if (window.confirm(`${newPerson.name} is already in the phone book! Replace old number with new one?`)) {
        const updatedPerson = {...persons.find(p => p.name === newName), number: newNumber}

        phonebook
        .updateNumber(updatedPerson)
        .then(response => setPersons(persons.map(p => p.id === response.data.id ? response.data : p)))
      }
    } else {
      phonebook
        .create(newPerson)
        .then(response => setPersons(persons.concat(response.data)))
    }
  }

  function deleteName(id) {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      phonebook.deleteNumber(id)
        .then(() => setPersons(persons.filter(p => p.id != id)))
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
      <Persons persons={persons} newFilter={newFilter} deleteName={deleteName} />
    </div>
  )
}

export default App