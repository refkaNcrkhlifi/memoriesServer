import express from "express"
import { singinUser, sigupUser } from "../controles/user.js"

const router = express.Router()


router.post("/singin", singinUser)
router.post("/singup", sigupUser)


export default router