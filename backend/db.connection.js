import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const url =
      "mongodb+srv://iims:iims123@swayam.dlsgk.mongodb.net/Hamro-Bike?retryWrites=true&w=majority&appName=Swayam";

    await mongoose.connect(url);

    console.log("DB connection successful...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export default dbConnect;
