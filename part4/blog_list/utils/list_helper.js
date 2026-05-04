const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((count, blog) => {
        return count += blog.likes;
    }, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max;
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')
    const [author, posts] = _.maxBy(Object.entries(grouped), ([, posts]) => posts.length);
    return { author, blogs: posts.length };
}

const mostLikes = (blogs) => {
    const counts = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc
    }, {})
    const top = Object.entries(counts).reduce((top, author) => {
        return top[1] > author[1] ? top : author;
    })
    return { author: top[0], likes: top[1] };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
