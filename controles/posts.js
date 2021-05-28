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
    // const { title, message, creator, tags, likes } = req.body
    const userId = req.user
    const post = req.body
    const newPost = new postMessage({...post,creator:userId})
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
export const likePost = async (req, res) => {
    const { id } = req.params
    const userId = req.user
    const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
    };
    if (!userId) return res.status(401).send('user unathantecated !')
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id")
    try {
        const  post= await postMessage.findOne({ _id: id })
        const index = post.likes.findIndex(id => id === String(userId))
       
        if (index === -1) {
            post.likes.push(userId)
        } else {
            post.likes= post.likes.filter(element => element !== String(userId))

        }
        
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
        res.status(200).send(deletedPost)
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: error.message })

    }
}

