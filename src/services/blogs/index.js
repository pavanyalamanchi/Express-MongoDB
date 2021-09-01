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

//********Comments Services*******/

blogRouter.post('/:blogId/comments', async(req, res, next) => {
    try {
        const blog = await BlogModel.findById(req.params.blogId)
        if (blog) {
            const commentToPost = {...req.body, commentDate: new Date() }
            const comment = await BlogModel.findByIdAndUpdate(req.params.blogId, { $push: { comments: commentToPost } }, { new: true })
            res.send(comment)
        } else {
            console.log('no blog found')
        }
    } catch (error) {
        console.log(error)
    }
})

blogRouter.get('/:blogId/comments', async(req, res, next) => {
    try {
        const blog = await BlogModel.findById(req.params.blogId)
        res.send(blog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.put('/:blogId/comments/:commentId', async(req, res, next) => {
    try {
        const blog = await BlogModel.findById(req.params.blogId)
        const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === req.params.commentId)
        blog.comments[commentIndex] = {...blog.comments[commentIndex].toObject(), ...req.body, _id: req.params.commentId }
        await blog.save()
        res.send(blog)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.get('/:blogId/comments/:commentId', async(req, res, next) => {
    try {
        const blog = await BlogModel.findById(req.params.blogId)
        const comment = blog.comments.find(c => c._id.toString() === req.params.commentId)
        res.send(comment)
    } catch (error) {
        console.log(error)
    }
})

blogRouter.delete('/:blogId/comments/:commentId', async(req, res, next) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.blogId, {
            $pull: {
                comments: { _id: req.params.commentId }
            }
        }, { new: true })
        res.send(blog)
    } catch (error) {
        console.log(error)
    }
})

export default blogRouter