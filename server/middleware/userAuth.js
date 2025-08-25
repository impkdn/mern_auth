import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({success: false, message: "not authorised login" })
    }
    try {
        const tokenDecod =  jwt.verify(token, process.env.JWT_SECRET);
        
        if (tokenDecod.id) {
            req.body.userId = tokenDecod.id
        } else {
            return res.json({success: false, message: "not authorised login again" })
            
        }

        next();
        
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export default userAuth;