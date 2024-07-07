import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(
      "mongodb+srv://nakamuuu-prog:UbclwsNFzoNWWwNt@cluster0.ea4azuy.mongodb.net/nakamuuu-prog?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Success: Connected to MongoDB");
  } catch (err) {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
};

export default connectDB;
