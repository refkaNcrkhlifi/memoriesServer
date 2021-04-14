import express from "express"
import { getPosts, addPost, updatePost, deletePost, likePost } from "../controles/posts.js"

const router = express.Router()

router.get("/", getPosts)
router.post("/addPost", addPost)
router.post("/:id", updatePost)
router.delete("/:id", deletePost)
router.put("/:id", likePost)

export default router