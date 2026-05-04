const _ = require('lodash')

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((count, blog) => {
        return count += blog.likes;
    }, 0);
}

const mostLikes = (blogs) => {
    return blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max;
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')
    const [author, posts] = _.maxBy(Object.entries(grouped), ([, posts]) => posts.length);
    return { author, blogs: posts.length };
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
}
