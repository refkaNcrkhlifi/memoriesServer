import express from "express"
import { getPosts, addPost, updatePost } from "../controles/posts.js"

const router = express.Router()

router.get("/", getPosts)
router.post("/addPost", addPost)
router.patch("/:id", updatePost)

export default router