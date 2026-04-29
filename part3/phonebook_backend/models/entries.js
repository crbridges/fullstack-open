const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

entrySchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Entry = new mongoose.model("Entry", entrySchema);

mongoose.connect(url, { family: 4})
    .then(result => {
        console.log("connected to mongoDB")
    })
    .catch(error => {
        console.log("error connection to mongoDB: ", error.message)
    })

module.exports = mongoose.model("Entry", entrySchema);