require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Entry = require('./models/entries')

const app = express()
app.use(express.json())
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'))
app.use(express.static("dist"))

let getAll = async () => {
    return await Entry.find({})
}

app.get("/api/persons", async (req, res) => {
    console.log("getall")
    // Entry.find({}).then(result => {
    //     res.json(result)
    // })
    const result = await getAll();
    res.json(result)
})

app.get("/api/persons/:id", (req, res, next) => {
    console.log(req.params.id)
    Entry.find({_id: req.params.id}).then( person => {
    if (person) res.json(person)
    else res.status(404).end()
    })
    .catch(error => next(error))
})

app.get("/info", (req, res) => {
    const now = new Date()
    Entry.find({}).then(entries => {
    res.send(`Phonebook has info for ${entries.length} people<br>
        ${now}`)
    })
})

app.delete("/api/persons/:id", (req, res, next) => {
    Entry.deleteOne({_id: req.params.id}).then( () => res.status(204).end())
    .catch(error => next(error))
})

app.post("/api/persons", (req, res) => {
    console.log(req.body.number)
    if (!req.body.name || !req.body.number) {
        return res.status(400).json( {error: "Name and number are required"})
    }
    const newEntry = new Entry({
        name: req.body.name,
        number: req.body.number,
    })

    newEntry.save().then (result => { res.status(201).json(result)})
})

app.put("/api/persons/:id", (req, res, next) => {
    Entry.findById(req.params.id)
    .then(
        entry => {
            if (!entry) return res.status(404).send("no bueno")
            entry.number = req.body.number
            entry.save().then(updatedEntry => {
                res.json(updatedEntry)
            })
        })
    .catch(error => next(error))

})

app.use((error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(666).send("you boofed it")
    }
    next(error)
})

const PORT = process.env.PORT || '3001'
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})