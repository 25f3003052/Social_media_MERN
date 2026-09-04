import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export const isAuthenticated = async(req, res)=>{
    const token = req.cookies.token

    if(!token ){
        res.status(401).json({message : "Not authorized"})
    }
    // console.log(token);
    
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    
    // console.log(decoded);
    
    const user = await User.findById(decoded.userId)
    
    if(!user){
        res.status(404).json({message : "User Not Found TOken Invalid"})
    }

    req.user = user 

    // console.log(user);

    next()


}





