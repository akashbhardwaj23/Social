import jwt from "jsonwebtoken"

export const verifyToken = async (req:any, res:any, next:any) => {
    try {
        
        const token = req.header('Authorization').split(" ")[1];

        if(!token) return res.status(401).json("Access Denied");

        const verified = jwt.verify(token, process.env.JWT_SECRET || "")
        console.log(verified);
        req.user = verified;

        console.log("ACCESS")
        next()
    } catch (error:any) {
        res.status(500).json(error.message)
    }
}