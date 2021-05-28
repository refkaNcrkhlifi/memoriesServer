import express from "express"
import { getPosts, addPost, updatePost, deletePost, likePost } from "../controles/posts.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/", getPosts)
router.post("/addPost",auth, addPost)
router.post("/:id", auth, updatePost)
router.delete("/:id", auth, deletePost)
router.put("/:id", auth, likePost)

export default router