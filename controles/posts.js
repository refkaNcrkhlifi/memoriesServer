import mongoose from 'mongoose'
import postMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await postMessage.find()
        res.status(200).send(posts)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}
export const addPost = async (req, res) => {
    // const { title, message, creator, tags, likeNumber } = req.body
    const post = req.body
    const newPost = new postMessage(post)
    try {
        await newPost.save()
        res.status(200).send(newPost)
    } catch (error) {
        res.status(401).send({ message: error.message })
    }
}
export const updatePost = async (req, res) => {
    const { id: _id } = req.body
    const post = req.body
    if (!mongoose.Type.ObjectiId.isValide(_id)) return res.status(404).send("no post with that id")
    const updatedPost = await postMessage.findByIdAndUpdate(_id, post, { new: true })

    res.json(updatedPost)
}

