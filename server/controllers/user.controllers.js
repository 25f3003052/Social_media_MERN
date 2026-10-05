import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { genToken } from "../utils/generateToken.js"

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 10 * 24 * 60 * 60 * 1000
}

//Register Controller 

export const registerUser = async (req, res) => {
    try {

        const { name, email, password, username } = req.body
        //mdn website for status code 

        //all fields present
        if (!username || !email || !password || !name) {
            return res.status(400).json({ message: "All fields required" })
        }

        //password should be greater than 6 char 
        if (password.length < 6) {
            return res.status(400).json({ message: "Password length should be greater than 6" })
        }

        //if the email or username already exists 

        // whenever creating a variable inside a function async the main function and await the variables created within it 

        const userNameExists = await User.findOne({ username })

        if (userNameExists) {
            return res.status(409).json({ message: "User already exists" })
        }

        const userEmailExists = await User.findOne({ email })

        if (userEmailExists) {
            return res.status(409).json({ message: "Email already exists" })
        }




        //Password Security can only be used if we add a salt or error
        //salting

        const salt = await bcrypt.genSalt(12)


        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })





        //token - JWT - access Tocken 

        // newUser._id

        const token = genToken(newUser._id)

        res.cookie('token', token, cookieOptions)   //display_name , token_variable , cookieOptions



        return res.status(201).json({
            message: "User Registered",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            }
        })


    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })


    }


}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email })

        if (!user) {

            return res.status(404).json({ message: "User not found" })

        }

        const passwordCheck = await bcrypt.compare(password, user.password)

        if (!passwordCheck) {
            return res.status(401).json({ message: "Password is incorrect" })
        }

        const token = genToken(user._id)
        res.cookie('token', token, cookieOptions)

        return res.status(200).json({
            message: "USER LOGGED IN",
            userData: {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


export const getUser = async (req, res) => {
    res.status(200).json({ message: "User Authenticated", userData: req.user })
}




