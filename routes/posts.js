import express from "express"
import { getPosts, addPost, updatePost, deletePost } from "../controles/posts.js"

const router = express.Router()

router.get("/", getPosts)
router.post("/addPost", addPost)
router.post("/:id", updatePost)
router.delete("/:id", deletePost)

export default router