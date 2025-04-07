"use server";
import { ConnectToDB } from "../mongoose";
import UserModel from "@/lib/models/user.model";
import MessageModel from "@/lib/models/message.model";

export const getCurrentUser = async (email: string) => {
  try {
    await ConnectToDB();
    const user = await UserModel.findOne({ email })
      .select("-password")
      .populate("contacts", "-password")
      .populate({
        path: "unreadMessages",
        model: MessageModel,
        populate: {
          path: "sender receiver",
          model: UserModel,
          select: "-password",
        },
      });

    if (!user) {
      return JSON.parse(
        JSON.stringify({ status: 404, message: "User Not Found", data: {} })
      );
    }
    return JSON.parse(
      JSON.stringify({ status: 200, message: "User Found", data: user })
    );
  } catch (error) {
    console.log(error);

    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error get current user",
        data: error,
      })
    );
  }
};

export const getOtherUsers = async (userId: string) => {
  try {
    await ConnectToDB();
    const users = await UserModel.find({
      _id: { $ne: userId },
      $or: [
        { "privacySettings.noFindingMe": false }, // Users who have noFindingMe set to false
        { "privacySettings.noFindingMe": { $exists: false } }, // Users where noFindingMe is undefined
      ],
    }).select("-password");

    return JSON.parse(
      JSON.stringify({ status: 200, message: "Users Found", data: users })
    );
  } catch (error) {
    console.log(error);
    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error get other users",
        data: error,
      })
    );
  }
};

export const updateUser = async (userId: string, data: any) => {
  try {
    await ConnectToDB();
    const user = await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
    }).select("-password");
    return JSON.parse(
      JSON.stringify({ status: 200, message: "User Updated", data: user })
    );
  } catch (error) {
    console.log(error);
    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error update user",
        data: error,
      })
    );
  }
};

export const addToContacts = async (userId: string, contactId: string) => {
  try {
    const addedToContacts = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { contacts: contactId } },
      { new: true }
    ).select("-password");
    if (addedToContacts) {
      return JSON.parse(
        JSON.stringify({
          status: 200,
          message: "Contact Added",
          data: addedToContacts,
        })
      );
    } else {
      throw new Error("Error adding contact");
    }
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error add to contacts",
        data: error,
      })
    );
  }
};
