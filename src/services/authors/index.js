import express from 'express'
import AuthorModel from './schema.js'
import q2m from 'query-to-mongo'

const authorRouter = express.Router()

authorRouter.get('/', async(req, res) => {
    try {
        const query = q2m(req.query)

        const total = await AuthorModel.CountDocuments(query.criteria)
        const authors = await AuthorModel.find(query.criteria, query.options.fields)
            .limit(query.options.limit)
            .skip(query.options.skip)
            .sort(query.options.sort)
            .populate('authors')

        res.send({ links: query.links('/authors', total), total, authors })
    } catch (error) {
        console.log(error)
    }
})

authorRouter.post('/', async(req, res) => {
    try {
        const newAuthor = new AuthorModel(req.body)
        const { _id } = await newAuthor.save()
        res.send({ _id })
    } catch (error) {
        console.log(error)
    }
})

export default authorRouter