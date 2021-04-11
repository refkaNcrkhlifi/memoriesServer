import express from "express"
import { getPosts, addPost } from "../controles/posts.js"

const router = express.Router()

router.get("/", getPosts)
router.post("/addPost", addPost)

export default router