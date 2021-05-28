import express from "express"
import { singinUser, singupUser } from "../controles/user.js"

const router = express.Router()


router.post("/singin", singinUser)
router.post("/singup", singupUser)


export default router