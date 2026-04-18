import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "12-34-56789" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p, i) => <Person key={i} person={p} />)}
    </div>
  )
}

export default App