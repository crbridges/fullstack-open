import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
      <p>filter shown with <input value={newFilter} onChange={handleNewFilter}></input></p>
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
      <h2>Numbers</h2>
      {persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())).map((p, i) => <Person key={i} person={p} />)}
    </div>
  )
}

export default App