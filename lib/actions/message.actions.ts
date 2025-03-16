"use server";
import { ConnectToDB } from "../mongoose";
import Message  from "@/lib/models/message.model";
import { uploadCloudinary } from "@/lib/helper/cloudinary";


export const newMessage = async ({senderId, receiverId, text, file}:{
    senderId:string, receiverId:string, text:string, file:string
}) => {
    try {
        await ConnectToDB();
        let  image = {secure_url:""};
       if (file) {
         await uploadCloudinary(file, "message").then((result:any) => {
            image = {secure_url:result.secure_url};
        }).catch((error:any) => {         
            console.log(error);
            throw new Error("Error uploading image");
        });
       }
        const message = new Message({
            sender:senderId,
            receiver:receiverId,
            text,
            file:image.secure_url,
        });        
        const savedMesage  = await message.save();
        return JSON.parse(JSON.stringify({status:200, message: "Message Sent", data:savedMesage}));
    } catch (error:any) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
    }
}

export const getMessages = async (loggedInUserId:string, contactId:string) => {
    try {
        await ConnectToDB();
        const messages = await Message.find({
            $or:[
                {sender:loggedInUserId, receiver:contactId},
                {sender:contactId, receiver:loggedInUserId},
            ]
        }).populate("sender receiver");
        return JSON.parse(JSON.stringify({status:200, message: "Messages Found", data:messages}));
    } catch (error:any) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
        
    }
}

