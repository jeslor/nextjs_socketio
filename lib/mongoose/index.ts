import mongoose from "mongoose";
let connected = false;
export const ConnectToDB = async () => {
  mongoose.set('strictQuery', false);
  if (connected) {
    console.log("Already connected to database");
    return;
  }
  try{
    
    await mongoose.connect(process.env.MONGODB_URI as string,{
      dbName:'NextChat',
    });
    connected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
    
};