import express from 'express'
import BlogModel from './schema.js'

const blogRouter = express.Router()

blogRouter.get('/', async(req, res, next) => {
    try {
        const blog = await BlogModel.find()
        res.send(blog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.post('/', async(req, res, next) => {
    try {
        const newBlog = new BlogModel(req.body)
        await newBlog.save()
        res.send(newBlog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.get('/:blogId', async(req, res, next) => {
    try {
        const blog = await BlogModel.findById(req.params.blogId)
        res.send(blog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.put('/:blogId', async(req, res, next) => {
    try {
        const modifiedBlog = await BlogModel.findByIdAndUpdate(req.params.blogId, req.body, { new: true })
        res.send(modifiedBlog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.delete('/:blogId', async(req, res, next) => {
    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(req.params.blogId)
        res.send(deletedBlog)
    } catch (error) {
        console.log(error)
    }
})

export default blogRouter