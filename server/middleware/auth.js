import jwt from "jsonwebtoken"


export const verifyToken = async (req, res, next) => {
 try {

    // frontend will set this token
    let token = req.header('Authorization')

    if(!token) return res.status(403).send('Access Denied')

    if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length).trimLeft()
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    //  remove This
    console.log("ACCESS")

    next();
 } catch (error) {
    res.status(500).json({Errormessage:error.message})
 }   
}