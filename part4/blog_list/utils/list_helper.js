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

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}
