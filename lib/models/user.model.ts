import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
const Schema = mongoose.Schema;

const userSchema  = new Schema({
    username:{
        type:String,
        required:true,
    },
    theme:{
        type:String,
        default:"dark",
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    messageNotifications:{
        type:Boolean,
        default:false,
    },
    unreadMessages:[
        {
            type:Schema.Types.ObjectId,
            ref:"Message"
        }   
    ],
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:""
    },
    contacts:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    privacySettings:{
        hideProfilePhoto:{
            type:Boolean,
            default:false,  
        },
        hideOnlineStatus:{
            type:Boolean,
            default:false,
        },
        hideLastSeen:{
            type:Boolean,
            default:false,
        },
        noFindingMe:{
            type:Boolean,
            default:false,
        },
        hideOtherContacts:{
            type:Boolean,
            default:false,
        },
    },

},
{
    timestamps:true,
});



const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;