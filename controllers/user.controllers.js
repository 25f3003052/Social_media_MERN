import User from "../models/user.model.js"
import bcrypt from "bcrypt"
//Register Controller 

export const registerUser =async (req ,res)=>{
    try{

        const {name , email , password , username } = req.body
        //mdn website for status code 
        
        //all fields present
        if(!username || !email || !password || !name){
            return res.status(400).json({message : "All fileds Required"})
        } 
        
        //password should be greater than 6 char 
        if(password.length < 6 ){
            return res.status(400).json({message : "Password Length Should Be Greater Than 6"})
        }
        
        //if the email or username already exists 
        
         
        
        const userNameExists = await User.findOne({username})
        
        if(userNameExists){
            return res.status(409).json({message : "User already Exists"})
        }
        
        const userEmailExists = await User.findOne({email})

        if(userEmailExists){
            return res.status(409).json({message : "email already Exists"})
        }
        
        //Password Security can only be used if we add a salt or error
        
        const salt =await bcrypt.genSalt(10)
        
        //salt for reference
        
        console.log(salt);
        
        const  hashedPassword = await bcrypt.hash(password , salt)
        
        console.log(hashedPassword);
        
        
        const newUser = await User.create({
            name,
            username,
            email,
            password : hashedPassword
        })
        
        return res.status(201).json({message : "User Registered" , user :newUser })
        
        
        
        
    }
    catch(error){
        return res.status(500).json({message: "Integernal Server Error " , error : error})
        
        
    }
    
    
}


const loginUser = async (req, res)=>{
    try{
        const {email , password } = req.body
        const user = await User.findOne({email})
        
        if(!email ){
            
            return res.status(404).json({message : "User not found"})
        }
        
        const passwordCheck = bcrypt.compare(password , user.password)
        
        console.log(passwordCheck)
        
        if(!passwordCheck){
            return res.status(404).json({message : "Password is incorrect"})
        }
        
        return res.status(200).json({message : "USER LOGGED IN"})
        
    }catch(error){
        return res.status(500).json({message: "Integernal Server Error " , error : error})
    }
}

