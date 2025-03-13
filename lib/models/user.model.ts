import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
const Schema = mongoose.Schema;

const userSchema  = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:""
    },
    chats:{
        type:[{type:Schema.Types.ObjectId, ref:"Chat"}],
        default:[],
    }
},
{
    timestamps:true,
});

export default mongoose.models.User || mongoose.model("User", userSchema);