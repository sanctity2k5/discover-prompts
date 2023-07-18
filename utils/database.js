import mongoose from "mongoose";

export const connectToDB = async () => {
    mongo.set("strictQuery", true);

    if(isConnected){
        console.log("DB connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: process.env.MONGO_DB,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("MongoDB connected");
    } catch(error){
        console.log(error)
    }

}