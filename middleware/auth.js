import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headres.splice(" ")[0]

        isCostomToken = token.length < 500
        let decodeData
        if (isCostomToken) {
            decodeData = jwt.verify(token, "memories Project")
            req.user = decodeData?.id
            console.log("userid ===>", decodeData?.id);
        } else {
            decodeData = jwt.decode(token)
            req.user = decodeData?.sub
        }
        next()
    } catch (error) {
        console.log(error.message);
    }
}
export default auth