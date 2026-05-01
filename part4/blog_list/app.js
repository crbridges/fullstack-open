const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

mongoose
    .connect(config.MONGODB_URL, { family: 4 })
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch(error => {
        logger.error("Failed to connect to MongoDB", error.message);
    })


app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;