const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('tiny'))

app.use(express.json())

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(phonebook)
})

app.get("/api/persons/:id", (req, res) => {
    console.log(req.params.id)
    let person = phonebook.find(p => p.id === req.params.id)
    if (person) res.json(person)
    else res.status(404).end()
})

app.get("/info", (req, res) => {
    const now = new Date()
    res.send(`Phonebook has info for ${phonebook.length} people<br>
        ${now}`)
})

app.delete("/api/persons/:id", (req, res) => {
    phonebook = phonebook.filter(p => p.id !== req.params.id)

    console.log(phonebook)
    res.status(204).end()
})

app.post("/api/persons", (req, res) => {
    const id = Math.floor(Math.random() * 100001)

    if (!req.body.name || !req.body.number || phonebook.find(p => p.name === req.body.name || req.body.number === p.number)) {
        return res.status(400).json( {error: "Name and number must be unique"})
    }

    phonebook = phonebook.concat({...req.body, id})
    console.log(phonebook)
    res.status(201).end()
})


const PORT = '3001'
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})