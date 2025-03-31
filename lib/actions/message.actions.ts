"use server";
import { ConnectToDB } from "@/lib/mongoose";
import Message  from "@/lib/models/message.model";
import UserModel from "@/lib/models/user.model";
import { uploadCloudinary } from "@/lib/helper/cloudinary";


export const newMessage = async ({senderId, receiverId, text, file}:{
    senderId:string,
    receiverId:string,
    text:string,
    file?:any
}) => {
    try {
        await ConnectToDB();
        let  image = {secure_url:""};
       if (file) {
         await uploadCloudinary(file, "message").then((result) => {
            if (result && 'secure_url' in result) {
                image = { secure_url: result.secure_url };
            } else {
                throw new Error("Invalid response from uploadCloudinary");
            }
        }).catch((error) => {         
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

        await message.save();
        const updatedMessage = await Message.findOne({_id:message._id}).populate("sender receiver");
        
       
        return JSON.parse(JSON.stringify({status:200, message: "Message Sent", data:updatedMessage}));
    } catch (error) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
    }
}

export const getMessages = async (loggedInUserId:string, contactId:string) => {
    try {
        await ConnectToDB();
        const messages = await Message.find({
            $and: [
                { 
                  $or: [
                    { sender: loggedInUserId, receiver: contactId },
                    { sender: contactId, receiver: loggedInUserId }
                  ]
                },
                { deleted: false },
                { seen: true }
              ]
        }).populate("sender receiver");
        return JSON.parse(JSON.stringify({status:200, message: "Messages Found", data:messages}));
    } catch (error) {
        console.log(error);
        return JSON.parse(JSON.stringify({status:500, message: "Internal Server Error", data:error}));
        
    }
}


export const unReadMessages = async (loggedInUserId: string, message: any)  => {

    try {
        await ConnectToDB();
        const updatedLoggedInUser = await UserModel.findOneAndUpdate(
            { _id: loggedInUserId },
            {
                $push: {
                    unreadMessages: message
                }
            },
            { new: true }
        ).populate("unreadMessages");
        return JSON.parse(JSON.stringify({ status: 200, message: "Message added to unread", data: updatedLoggedInUser }));
    } catch (error) {
        console.log(error);
        return JSON.parse(JSON.stringify({ status: 500, message: "error in adding message to unread", data: error }));
    }
}

export const updateReadMessages = async (loggedInUserId: string, messageIds: string[]) => {
    try {
        await ConnectToDB();
        const updateReadMessages = await Message.updateMany(
            { _id: { $in: messageIds } },
            { $set: { seen: true } },
            { new: true }
        );

        

        const updatedLoggedInUser = await UserModel.findOneAndUpdate(
            { _id: loggedInUserId },
            {
                $pull: {
                    unreadMessages: { $in: messageIds }
                }
            },
            { new: true }
        ).populate("unreadMessages");
        

        if (!updatedLoggedInUser) {
            return JSON.parse(JSON.stringify({ status: 404, message: "User not found", data: null }));
        }
        if (updateReadMessages.modifiedCount === 0) {
            return JSON.parse(JSON.stringify({ status: 404, message: "No messages found", data: null }));
        }
        if (updateReadMessages.modifiedCount !== messageIds.length) {
            return JSON.parse(JSON.stringify({ status: 404, message: "Some messages not found", data: null }));
        }
        if (updateReadMessages.modifiedCount === messageIds.length) {
            return JSON.parse(JSON.stringify({ status: 200, message: "All messages updated to seen", data: updatedLoggedInUser }));
        }
        if (updateReadMessages.modifiedCount > 0) {
            return JSON.parse(JSON.stringify({ status: 200, message: "Some messages updated to seen", data: updatedLoggedInUser }));
        }
    } catch (error) {
        console.log(error);
        return JSON.parse(JSON.stringify({ status: 500, message: "Internal Server Error", data: error }));
    }
}

