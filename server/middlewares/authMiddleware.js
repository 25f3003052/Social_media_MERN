import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({ message: "Not authorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId)

        if (!user) {
            return res.status(401).json({ message: "User Not Found Token Invalid" })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error.message })
    }
}





