import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true ,
    },
    username : {
        type : String,
        required : true ,
        unique : true ,
    },
    email : {
        type : String,
        required : true ,
        unique : true ,
    },
    password : {
        type : String,
        required : true,
    },

    profileImage : {
        type : String,         
      //media files cant be stored in the db ,store url instead {media management platform ""cloudinary""}

    },
    followers : [],    //list of objects 

    followings  : [],
    
    posts : [],

    stories : [], 

    reels : [] 
 
} , {timestamps : true })


const User = mongoose.model('User' , userSchema )  //(name_schema , variable_variable )

// this is to put the schema in a model 
// further the model is named as User 

export default User 






