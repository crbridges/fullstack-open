import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  function addName(e) {
    e.preventDefault();
    const newPersons = persons.concat({name: newName});
    setPersons(newPersons);
    console.log(newPersons);
  }

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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