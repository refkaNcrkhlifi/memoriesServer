import userModel from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const singinUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) res.status(404).json({ message: "user dosen't exist." })

        const correctPasseword = bcrypt.compaire(password, existingUser.password)
        if (!correctPasseword) res.status(400).json({ message: "invalide credentials." })
        const token = jwt.sign({ email, password, id: (await existingUser)._id }, "memories Project", { expiresIn: "1h" })

        res.status(200).send({ token, result: existingUser })
    } catch (error) {
        res.status(500).send(error.message)
    }

}

export const sigupUser = async (req, res) => {

}