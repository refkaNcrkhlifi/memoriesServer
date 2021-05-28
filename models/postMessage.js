import mongoose from 'mongoose'


const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
export default mongoose.model("postMessage", postSchema)
