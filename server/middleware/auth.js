import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
   try {
    const token = req.cookies.accessToken ||  req.headers?.authorization?.split(" ")[1]
    if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
                error: true,
                success: false
            });
        }
     
    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)

    if(!decode) {
        return res.status(401).json({
            message: "Unauthorized Access",
            error: true,
            success: false
        })
    }

    req.userId = decode.id
    
    next();

   } catch (error) {
    return res.status(500).json({
        message: "you ha not login",
        error: true, 
        success: false
    })
   }
}
export default auth