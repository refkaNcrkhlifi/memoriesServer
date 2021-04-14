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
    const { id } = req.params
    const post = req.body
    const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
    };
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id")
    try {
        const updatedPost = await postMessage.findByIdAndUpdate(id, post, options)
        res.status(200).send(updatedPost)
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: error.message })

    }
}
export const deletePost = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id")
    try {
        const deletedPost = await postMessage.deleteOne({ _id: id })
        console.log("88", deletedPost);
        res.status(200).send(deletedPost)
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: error.message })

    }
}

