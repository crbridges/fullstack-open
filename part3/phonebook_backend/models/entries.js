const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      }
    },
    required: true,
  },
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Entry = new mongoose.model('Entry', entrySchema)

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch(error => {
    console.log('error connection to mongoDB: ', error.message)
  })

module.exports = Entry