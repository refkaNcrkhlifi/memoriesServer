import monggose from "mongoose"

const connectDB = async () => {
    try {
        const connection = await monggose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        console.log("connected to dataBase")
        return connection
    } catch (error) {
        console.log("error in database connection")
    }
}
export default connectDB