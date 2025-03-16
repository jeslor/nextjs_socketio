import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        default:"",
    },
    file:{
        type:String,
        default:"",
    },
    seen:{
        type:Boolean,
        default:false,
    },
    delivered:{
        type:Boolean,
        default:false,
    },
    deleted:{
        type:Boolean,
        default:false,
    },
},
{
    timestamps:true,
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export default Message;