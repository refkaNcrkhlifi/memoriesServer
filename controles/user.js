import userModel from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const singinUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) return res.status(404).json({ message: "user dosen't exist." })

        const correctPasseword = bcrypt.compare(password, existingUser.password)
        if (!correctPasseword) return res.status(400).json({ message: "invalide credentials." })
        const token = jwt.sign({ email, password, id: existingUser._id }, "memories Project", { expiresIn: "1 h" })

        return res.status(200).send({ token, result: existingUser })
    } catch (error) {
        res.status(500).send(error.message)
    }

}

export const singupUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body

    try {
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) return res.status(400).json({ message: "email already used." })
        if (password !== confirmPassword) return res.status(400).json({ message: "passewords are not the same." })

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new userModel({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        const result = await user.save()
        const token = jwt.sign({ email, password, id: result._id }, "memories Project", { expiresIn: "1 h" })

        return res.status(200).send({ token, result })
    } catch (error) {
        res.status(500).send(error.message)

    }


}