import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("db connection build successfullly!!");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
