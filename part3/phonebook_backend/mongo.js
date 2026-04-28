const mongoose = require('mongoose')

const password = encodeURIComponent(process.argv[2]);
const username = encodeURIComponent('cbridgescoding_db_user');

const url = `mongodb+srv://cbridgescoding_db_user:${password}@cluster0.qdogccf.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Entry = mongoose.model("Entry", entrySchema)

console.log(process.argv[1])
if (process.argv.length < 2) {
    console.log('>:(')
    process.exit(1)
} else if (process.argv.length === 3) {
    mongoose.connect(url, { family: 4 })

    Entry.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(entry => {
            console.log(entry.name, entry.number)
        })
        mongoose.connection.close()
    })

} else if (process.argv.length === 5) {
    mongoose.connect(url, { family: 4 })

    const newEntry = new Entry({
        name: process.argv[3],
        number: process.argv[4]
    })

    newEntry.save().then(result => {
        console.log(result.data)
        mongoose.connection.close()
    })

}