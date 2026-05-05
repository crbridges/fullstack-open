const blogsRouter = require('express').Router()
const { response } = require('../app');
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result);
  } catch (error)  {
    next(error);
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id);
  blog.likes = request.body.likes
  await blog.save();

  response.json(blog);
})

module.exports = blogsRouter;