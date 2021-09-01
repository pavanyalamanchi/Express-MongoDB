import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import blogRouter from './services/blogs/index.js'

const server = express()

const port = process.env.PORT || 3001

//********MIDDLEWARES******//

server.use(express.json())

//***********Routes*******//

server.use('/blogs', blogRouter)

//***********ERROR HANDLERS**********//

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
    console.log("connected to mongo!!")
    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log(`Server running on ${port}`)
    })
})

mongoose.connection.on("error", err => {
    console.log(err)
})