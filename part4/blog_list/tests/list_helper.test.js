const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = require('./test_helper').initialBlogs

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[1]])
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  })
})

describe('favorite blog', () => {
    test('find blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs);
        assert.deepStrictEqual(result, blogs[2]);
    })

    test('when list has one one blog, equals that blog', () => {
        const result = listHelper.favoriteBlog([blogs[3]]);
        assert.deepStrictEqual(result, blogs[3]);
    })

    test('of empty list is undefined', () => {
        const result = listHelper.favoriteBlog([]);
        assert.deepStrictEqual(result, undefined)
    })
})

test('find author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    const sol = {    
        author: "Robert C. Martin",
        blogs: 3
    }
    assert.deepStrictEqual(result, sol)
})

test('find author with most likes', () => {
    const result = listHelper.mostLikes(blogs);
    const sol = {
        author: "Edsger W. Dijkstra",
        likes: 17
    }
    console.log(result)
    assert.deepStrictEqual(result, sol)
})