const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app');
const assert = require('node:assert');
const { initialBlogs, blogsInDb } = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)       
})

test('get returns all blogs', async () => {
    const blogs = await api.get('/api/blogs');
    assert.strictEqual(blogs.body.length, initialBlogs.length);
})

after(async () => {
    await mongoose.connection.close();
})