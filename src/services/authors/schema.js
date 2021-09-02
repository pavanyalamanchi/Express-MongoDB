import mongoose from 'mongoose'

const { Schema, model } = mongoose.Schema

const authorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
}, {
    timestamps: true
})

export default model('Author', authorSchema)