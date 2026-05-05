const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app');
const assert = require('node:assert');
const { initialBlogs, blogsInDb } = require('./test_helper')
const Blog = require('../models/blog');
const { application } = require('express');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
})

describe("test get many endpoint", () => {
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

    test('verify that mongodb _id is converted to id', async () => {
        const blogs = await api.get('/api/blogs');
        assert.strictEqual('id' in blogs.body[0], true)
    })
})

describe('test post endpoint', () => {
    test('verify post creates new blog', async () => {
        const newBlog = { title: 'post title', author: 'post author', url: 'post url', likes: 0 };
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201);

        const blogs = await api.get('/api/blogs');

        assert.strictEqual(initialBlogs.length + 1, blogs.body.length)
    })

    test('post creates blog with correct content', async () => {
        const newBlog = { title: 'post title', author: 'post author', url: 'post url', likes: 0 };
        const result = await api
            .post('/api/blogs')
            .send(newBlog)
        
        const { title, author, url, likes } = result.body
        assert.deepStrictEqual({ title, author, url, likes }, newBlog)
    })
})

describe("tests like values", () => {
    test('test unspecified like value returns 0', async () => {
        const newBlog = { title: 'no likes', author: 'john nobody', url: "worstblog.com"};

        const result = await api
            .post('/api/blogs/')
            .send(newBlog);

        assert.strictEqual(result.body.likes, 0);
    })

    test('test correct number of likes returned', async () => {
        const result = await api.get('/api/blogs');
        assert.strictEqual(result.body[0].likes, 7);
    })
})

after(async () => {
    await mongoose.connection.close();
})