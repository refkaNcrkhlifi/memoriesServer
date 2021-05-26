import mongoose from 'mongoose'


const userShema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: String
})
export default mongoose.model("User", userShema)